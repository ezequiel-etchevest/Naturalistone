# %% Setup

import pandas as pd
import pdfplumber
import re 
from datetime import datetime ,date
import PyPDF2 
import mysql.connector  
import shutil
from Modified_Document_Parser import compare_file_text , move_file_with_rename
import os
from fuzzywuzzy import fuzz
import time
   
mydb = mysql.connector.connect(
    host="naturalistone.cfbecwildn3j.us-east-1.rds.amazonaws.com",
    user = "admin",
    password="Ra7878782",
    database= "NaturaliStone",
    port = 3306)  

mycursor = mydb.cursor()
 
list_of_files = ['.\\InvoicesReceived\\Invoice Naturali\\4416.pdf']

# =============================================================================
# 
# list_of_files = filter( os.path.isfile,
#                         glob.glob('.\\InvoicesReceived\\Invoice Naturali' + '\\' + '*') ) 
# list_of_files = sorted( list_of_files,
#                         key = os.path.getmtime)
# =============================================================================

for invoice in list_of_files:
    
    print(invoice)
    with pdfplumber.open(invoice) as pdf:
        if len(pdf.pages) == 1:
            page = pdf.pages[0]
            text = page.extract_text()
            tables = page.extract_tables() 
            MainTable = pdf.pages[0].extract_table()
        else:   
            text = ''.join(pdf.pages[i].extract_text() 
                           for i in range(len(pdf.pages)))
            tables = (pdf.pages[0].extract_tables() +
                      pdf.pages[1].extract_tables() )
            MainTable = (pdf.pages[0].extract_table() +
                      pdf.pages[1].extract_table() )
             
    pdfFileObj = open(invoice, 'rb')
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    pageObj = pdfReader.getPage(0)
    text2 = pageObj.extractText()
       
    
    existing_df = pd.DataFrame(columns=["UnitPrice", "ProdNameID",
                                        "DimensionID", "Quantity"])
       
    ProductsLines = list(map(lambda s: 
             ' '.join([item for item 
               in s if str(item) != 'None']).replace('\n',' '), 
         filter(lambda s: 'Special Order' in 
             ' '.join([item for item in s if str(item) != 'None']),
              MainTable))) 
        
    Errors = []
    
    for line in ProductsLines:  
        try:
          #  line = line.replace('Cosmopolitan Grey', 'Cosmopolitan Grey Matte') if 'Cosmopolitan Grey' in line else line
           # line = line.replace('Mosaic', 'Marble Mosaic') if 'Floridian Cream' in line else line
            line = line.replace('Cosmopolitan', 'Cosmopolitan Grey') if 'Cosmopolitan' in line and 'Gray' not in line else line
            line = line.replace('Steam Ash grey', 'Porcelain Steam Ash Grey') if 'Steam Ash grey' in line and 'Porcelain' not in line else line
            line = line.replace('Marble', 'Limestone') if 'Sevilla' in line else line  
              
                
            # Count the occurrences of 'Special Order'
            line = line.replace('Special Order', '', 1) if line.count('Special Order') == 2 else line
             
            line = line.replace('"','').replace("'",'').title().replace('X','x').replace("”","")
            line = line.replace('Pietra Ash', 'Pietra Bedonia') 
            line = line.replace('Bushhammered', 'Bush-Hammered') 
             
            line = line.replace( 'Vein-Cut ','Vein Cut')  
                
            LineSplit = line.split("Order")[1].strip().split(" ") 
             
            #LineSplit[LineSplit.index('Order:')+1]
            Quantity = float(line.split(" ")[0].replace(',',''))
            UnitPrice = float(LineSplit[-2].replace(',',''))
          
            if 'sp-1' in line.lower().replace(' ',''): 
                ProdNameID = 8908
                DimensionID = 10597
                    
                # Create a new DataFrame with the variables
                prods_df = pd.DataFrame({"UnitPrice": [UnitPrice], 
                                         "ProdNameID": [ProdNameID],
                                         "DimensionID": [DimensionID],
                                         "Quantity":[Quantity]})
          
                # Append the new DataFrame to the existing one
                existing_df = existing_df.append(prods_df, ignore_index=True) 
                continue
            
            
            #Get all avaiable Materials 
            mycursor.execute('select distinct(Material) from ProdNames where Material is not null')
            Materials = [Material[0] for Material in mycursor.fetchall() ] 
            
            if any(name in line for name in ['Artic Blue', 'Taj Mahal']) :
                MaterialType = 'Quartzite'
            elif any(Material in line for Material in Materials ):
                MaterialType = [[Material, LineSplit.index(Material)] for Material in Materials
                          if Material in LineSplit]
                if all(x in line for x in ['Marble', 'Mosaic']):
                    MaterialType = 'Marble' 
                else:
                    MaterialTypeIndex = min([index[1] for index in MaterialType])
                    MaterialType = [Material[0] for Material in MaterialType 
                                if MaterialTypeIndex in Material][0] 
            elif 'Travertin' in line:
                MaterialType = 'Italian Travertine'
            elif 'Bianco Grove' in line:
                MaterialType = 'Marble'
            elif 'Barcelona Avorio' in line:
                MaterialType = 'Porcelain'
            else:  
                MaterialType = None   
                
              
            NaturalStoneFlag = True if MaterialType not in ('Terrazzo', 'Porcelain') else False
                
            #Get all avaiable Finsishes
            mycursor.execute('select distinct(Finish) from Dimension where Finish is not null')
            Finishes = [Finish[0] for Finish in mycursor.fetchall() ]   
             
            
            
            if 'Wooden White' in line or all(x in line for x in ['Barcelona','Matte']) : 
                Finish = 'Natural'  
                
            elif all(finish in line for finish in ['Unfilled','Honed']): 
                Finish =  'Unfilled Honed'
             
            elif all(finish in line for finish in ['Filled','Honed']): 
                Finish =  'Filled & Honed' 
                
            elif any(finish in line for finish in Finishes):  
                Finish = [finish for finish in Finishes if finish in line]
                
                if len(Finish)  != 1:
                    Finish_best_match, highest_probability = max(((Finish, 
                                    fuzz.token_set_ratio(line, Finish)) 
                                    for Finish in Finishes), key=lambda x: (x[1], len(x[0])))
                    Finish = Finish_best_match
                    if highest_probability < 80: 
                        Errors.append('Finish ' + line) 
                        raise ValueError() 
                else:
                    Finish = Finish[0]
              #  FinishIndex = LineSplit.index(Finish)
            
            else:
                Finish_best_match, highest_probability = max(((Finish, 
                                fuzz.partial_ratio(line, Finish)) 
                                for Finish in Finishes), key=lambda x: (x[1], len(x[0])))
                
                if highest_probability < 80: 
                    Errors.append('Finish ' + line) 
                    raise ValueError() 
                else:
                    Finish = Finish_best_match 
                    
            Finish = 'Matte' if MaterialType == 'Porcelain' and Finish == 'Honed' else Finish 
            Finish = 'Natural' if all(x in line for x in ['Easy Extra White','Matte']) else Finish 
            Finish = 'Sandblasted' if (any(x == Finish for x in ['Grip'])
                                       and MaterialType != 'Porcelain') else Finish
            Finish = 'Honed' if MaterialType != 'Porcelain' and Finish == 'Matte' else Finish  
            
            #Get all avaiable Thicknesses  
            mycursor.execute('select distinct(Thickness) from Dimension where Thickness is not null')
            Thicknesses = [thickness[0].title()  for thickness in mycursor.fetchall() ]
            Thicknesses.append('11/4')
            Thicknesses.remove('2')
            ThicknessLine = ''.join(LineSplit[:-2]).replace('.5x','').replace(
                ' .5','1/2').replace('12Mm','1/2').replace('20Mm','3/4'
              ).replace('2Mc','3/4').replace('3Mc','1 1/4').replace(
                  '2Cm','3/4').replace('3Cm','1 1/4').replace('9Mm','3/8'
                                      ).replace('1Cm','3/8')
            
            if 'Mosaic' in line:
                Thickness = None
                                            
            elif any(Thickness in ThicknessLine for Thickness in Thicknesses):
                Thickness = [Thickness for Thickness in Thicknesses
                      if Thickness in ThicknessLine][0]
                if Thickness == '11/4':
                    Thickness = '1 1/4'   
                    
            elif MaterialType == 'Porcelain':
                Thickness = '3/8'
            elif 'x2"' in line:
                Thickness = '2'
            else:  
                Errors.append('Thickness ' + line) 
                raise ValueError()
            
            
            line = line.replace('32x71', '32x72')
            # Sizes
            mycursor.execute('select distinct(Size) from Dimension ' + 
                             'where DimensionID <> 10195 and Size is not null ')
            AllSizes = mycursor.fetchall()  
            try:
                Size = [Size for Size in AllSizes
                        if Size[0] in line.replace(' ',''
                                   ).replace("’",'').replace('"','')]
                
                if len(Size) == 1:
                    Size = Size[0][0]
                elif len(Size) > 1:
                    Size = max(Size, key=lambda x: len(x[0]))[0]
                       
                if  NaturalStoneFlag and (Size == [] or 'Slab' in line ):
                    if 'Slab' in line:
                        Size = None 
                    else: 
                        HeightWitdth = re.findall('[0-9]+x[0-9]+',line)[0].split('x')
                        Size = None if all(int(x) > 48 for x in HeightWitdth) else [] 
                    
                query = """
                    SELECT DimensionID FROM Dimension 
                    WHERE Type {} and  Size {} and Thickness {} and Finish {}
                """.format( f"= 'Slab'" if Size is None else "IS NOT NULL",
                            f"= '{Size}'" if Size is not None else "IS NULL",
                            f"= '{Thickness}'" if Thickness is not None else "IS NULL",
                            f"= '{Finish}'") 
                                                              
                mycursor.execute(query)
                DimensionID = mycursor.fetchall() 
                     
                DimensionID = DimensionID[0][0] 
            except:
                Errors.append('Dimension ' + line)  
                  
                
            if  'Ibiza Vein Cut' in line: 
                ProdNameID = 1724
            else:
                # PRODNAME ID  
                mycursor.execute(
                     """ select ProdNameID, Naturali_ProdName, Material from ProdNames 
                         where Naturali_ProdName is not null and Material is not null 
                         and Material = \"%s\" """ % (MaterialType) )
                ProdNames = mycursor.fetchall()  
                try:
                    line = line.replace('Calacatta Special', 'Calacatta Especial') 
                    if MaterialType == 'Terrazzo':
                        line = line.replace('White Thassos', 'Thassos Bianco')
                        line = line.replace(' And ',' & ')
                        line = line.replace('Bardiglio Veneto', 'Bardiglio Venato')
                        line = line.replace('Montenero', 'Monte Nero')
                    line = line.replace('Calcatta', 'Calacatta') 
                    line = line.replace('Calacatta Vision', 'Calacatta Vission') 
                    line = line.replace('Natural Natural', 'Natura Natural') 
                    line = line.replace('Sienna Gris', 'Sienna Grigio') 
                    line = line.replace('Creman Dolce', 'Crema Dolce') 
                    line = line.replace('Monte Bianco', 'Monte LeCiel') 
                    line = line.replace('MonteLeCiel', 'Monte LeCiel')  
                    line = line.replace('Monteleciel', 'Monte LeCiel') 
                    line = line.replace('Eleganzza', 'Eleganza')   
                    line = line.replace('Botticino', 'Botticino Rock')   
                    line = line.replace('Montclair', 'Montcler')   
                    line = line.replace('Montcler', 'Montcler Grey') if (
                        'Grey' not in line and 'Montcler' in line) else line 
                    line = line.replace('Ibiza', 'Ibiza Vein Cut')    
                   # if 'Cream' in line and 'Deco' not in line: 
                    #    line = line.replace('Cream', 'Cream Deco')  
                   # FoundProdNames = [ ProdName  for ProdName in ProdNames
                    #              if ProdName[1] != None and ProdName[1] in line] 
                     
                  #  if MaterialType == None and len(FoundProdNames) > 1: 
                  #      raise ValueError()
                  #  else:
                    probabilities = [fuzz.partial_ratio(line, value[1])
                                     for value in ProdNames] 
                    
                    FoundProds = [ProdNames[index] + (probability,)  for index, probability 
                               in enumerate(probabilities)   
                               if probability == max(probabilities) and probability >= 85] 
                    
                    if MaterialType == None and len(FoundProds) == 0: 
                        raise ValueError()
                    elif len(FoundProds) >= 2: 
                        probabilities = [fuzz.token_sort_ratio(line, 
                                               (value[2] + ' ' + value[1]))
                                         for value in FoundProds] 
                        
                        FoundProds = [FoundProds[index] + (probability,)  for index, probability 
                                   in enumerate(probabilities)   
                                   if probability == max(probabilities)] 
                        
                        ProdNameID = [Name for Name in FoundProds 
                                      if Name[1] == max([Name[1] for Name in FoundProds],
                                                        key = len)][0][0] 
                    else:  
                        ProdNameID = [Name for Name in FoundProds 
                                      if Name[1] == max([Name[1] for Name in FoundProds],
                                                        key = len)][0][0]
                        
                    if MaterialType != [value[2] for value in ProdNames 
                                        if ProdNameID == value[0]][0]:
                        raise ValueError()
                     
                except:
                    Errors.append('ProdName ' + line)   
                    
             
            # Create a new DataFrame with the variables
            prods_df = pd.DataFrame({"UnitPrice": [UnitPrice], 
                                     "ProdNameID": [ProdNameID],
                                     "DimensionID": [DimensionID],
                                     "Quantity":[Quantity]})
          
            # Append the new DataFrame to the existing one
            existing_df = existing_df.append(prods_df, ignore_index=True) 
        except: 
            pass
     
     
    print(Errors) if Errors != [] else print('Success')
    pdfFileObj.close()  
        