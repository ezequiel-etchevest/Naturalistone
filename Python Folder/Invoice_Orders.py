
# =============================================================================
# 1 - Identify Factory & Extract Invoice Information
# 2 - Fetch dimension from Factory_Dimensions
# 2a1-  Fetch == []: Insert in Factory_Dimensions with null in Naturali_Dimension
# 2a2-  Fetch == []: Insert Error in Errors  
# 3 - Fetch NaturaliProdName from ProdNames
# 3a1-  Fetch == []: Insert in ProdNames with null in Naturali_ProdName
# 3a2-  Fetch == []: Insert Error in Errors 
# 4 - If no Errors then fetch or insert Product in Products table and fetch ProdID.
# 5 - If no Errors then insert in ProdOrdered.
# 6 - Insert Ignore value in Order table, if no errors
# =============================================================================

# %%% Setup 
 
 
import pdfplumber
import re 
from fractions import Fraction
import pandas as pd 
from datetime import datetime 
import requests  
import shutil
import mysql.connector 
import os 
import Predictive_Capacity_Freight as pp
from Modified_Document_Parser import move_file_with_rename, compare_file_text
from fuzzywuzzy import fuzz
  
os.chdir('C://Users//DamianEtchevest//onedrive - naturalistone.com//Naturali')
 
def Move_to_Prev(Success, InvoiceNum, invoice, FactoryName):
    
    ######### Move any Previous Versions of Parsed Invoices in Invoice Naturali folder
    #########      to Mod Prev Version 
    filtered_ParsedInvoices = [ inv for inv in 
       os.listdir('.//InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Invoices//') 
       if InvoiceNum in inv]
    
    for inv in filtered_ParsedInvoices:
        move_file_with_rename(
            './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Invoices//' + inv, 
                inv.split('.pdf')[0],
            './/InvoicesReceived//Parsed Documents//Modifications (Prev Version) Factory Order//' + FactoryName + '//' )  
      
    ######### Move any error quotes to Mod Prev Version
    filtered_invoiceErrors =  [inv for inv in 
       os.listdir('.//InvoicesReceived//Parsed Documents//Errors//Order Factory Errors//'+ FactoryName + '//') 
       if InvoiceNum in inv]
    
    for inv in filtered_invoiceErrors:
        move_file_with_rename(
            './/InvoicesReceived//Parsed Documents//Errors//Order Factory Errors//' + FactoryName + '//' + inv, 
                inv.split('.pdf')[0],
            './/InvoicesReceived//Parsed Documents//Modifications (Prev Version) Factory Order//' + FactoryName + '//' )   
         
    
    if Success:
        move_file_with_rename(invoice, InvoiceNum, 
          './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Invoices//') 
    else: 
        move_file_with_rename(invoice, InvoiceNum,
          './/InvoicesReceived//Parsed Documents//Errors//Order Factory Errors//' + FactoryName + '//' )  
        
def ROI(MaterialType,Type):
    """ returns the % added to the cost of the material """
     
    if MaterialType == "Terrazzo" and Type == 'Slab':
        return 5
    else:
        return 2.2
        
def checkExisting(text, InvoiceNum, invoice, FactoryName):
    
    pdfFileObj = open(invoice, 'rb')
    filesParsedInvoices  = [ x.split('.pdf')[0] for x in 
             os.listdir('.//InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Invoices//') 
             if str(InvoiceNum) in x] 
    
    filesErrors  = [ x.split('.pdf')[0] for x in 
             os.listdir('.//InvoicesReceived//Parsed Documents//Errors//Order Factory Errors//' + FactoryName + '//') 
             if  str(InvoiceNum) in x] 
    
    resultsParsedInvoices = [compare_file_text(invoice, x.split('.pdf')[0], 
      './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Invoices//',  
      text, pdfFileObj )  for x in os.listdir(
          './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Invoices//') 
     if  str(InvoiceNum) in x] 
    
    resultsErrors = [compare_file_text(invoice, x.split('.pdf')[0], 
      './/InvoicesReceived//Parsed Documents//Errors//Order Factory Errors//' + FactoryName + '//',  
      text, pdfFileObj )  for x in 
           os.listdir('.//InvoicesReceived//Parsed Documents//Errors//Order Factory Errors//' + FactoryName + '//') 
     if  str(InvoiceNum) in x] 
    
    pdfFileObj.close() 
     
    if "Same" in resultsParsedInvoices or 'Same' in resultsErrors:
        mydb.close()    
        
        if 'Same' in resultsErrors:
            os.remove( invoice)
             
            print(f"{invoice} Same, replaced with new file in Errors")  
         
        else: 
            os.remove( invoice)
             
            print(f"{invoice} Same, replaced with new file in Successes")
        return True 
    else: 
        return False
    
    
# %%% DB Interactions. ProdName, Dimension, Products Functions. 
# %%%% ProdNameID. The following gets the prodNameID.

def ProdName(ProdCode , FactoryID, Material): 
    
    Material = 'Limestone' if ProdCode == 'Shell Reef' else Material
        
    # PRODNAME ID 
    mycursor.execute(
         """ select ProdNameID from ProdNames 
         where Factory_ProdName = \'%s\' and Material = \'%s\'"""
         % (str(ProdCode),Material))
    ProdNameID = mycursor.fetchall()
    
    if len(ProdNameID) > 1:
        # PRODNAME ID 
        mycursor.execute(
             """ select ProdNameID from ProdNames 
             where Factory_ProdName = \'%s\' and FactoryID = %s and Material = \'%s\'"""
             % (str(ProdCode),FactoryID, Material))
        ProdNameID = mycursor.fetchall()
    
    if ProdNameID == [] and 'Agglo' in ProdCode: 
        # PRODNAME ID 
        mycursor.execute(
             """ select ProdNameID from ProdNames 
             where Factory_ProdName = \'%s\' """
             % (' '.join(str(ProdCode).split(' ')[1:])))
        ProdNameID = mycursor.fetchall()
            
    if ProdNameID != []:
        ProdNameID = ProdNameID[0][0]
        return  ProdNameID  
    else: 
        mycursor.execute("""
             insert into ProdNames (FactoryID, Factory_ProdName, Material) 
             values (%s, \'%s\', \'%s\') ;""" %
             (FactoryID, str(ProdCode),Material )) 
    
        mydb.commit()
        print("New FactoryName", str(ProdCode), FactoryID,Material)
        Errors.append('FactoryName ')  
        return
    
    

# %%%% DimensionID. The following gets the DimensionID.
def Dimension(Factory_Dimension, Finish, FactoryID, Type   ):
    
    # DIMENSION ID
 
    mycursor.execute(
         """ select Naturali_Dimension from Factory_Dimensions 
         where Factory_Dimension = \'%s\' and FactoryID = \'%s\'  """
         % (Factory_Dimension.replace('.0',''),FactoryID))
    Naturali_Dimension = mycursor.fetchall()
    

    if Naturali_Dimension != []:
        if Naturali_Dimension[0][0] == None:
            print("Null Naturali Dimension")
            Errors.append("Null Naturali Dimension")   
            return
        
        Dimension = 'x'.join(Naturali_Dimension[0][0].split('x')[:-1])
        Thickness = Naturali_Dimension[0][0].split('x')[-1] 
        mycursor.execute(
             """ select DimensionID from Dimension
             where Size = \'%s\' and Thickness = \'%s\' 
             and Finish = \'%s\' """
             % (Dimension,Thickness, Finish)) 
        try:
            DimensionID = mycursor.fetchall()[0]  
            return DimensionID[0] 
        except:
            mycursor.execute("""
                insert ignore into Dimension ( Size, Thickness, Finish) 
                values (\'%s\' , \'%s\' ,\'%s\') ;""" %
                ( Dimension, Thickness, Finish)) 
            mydb.commit() 
            mycursor.execute(
                 """ select DimensionID from Dimension
                 where Size = \'%s\' and Thickness = \'%s\' 
                 and Finish = \'%s\' """
                 % (Dimension,Thickness, Finish)) 
            print("New Dimension Added into DImension Table")
            DimensionID = mycursor.fetchall()[0]
            return DimensionID[0] 
    else :  
        
        if FactoryID == 109: 
            Thickness = cm_to_fraction(float(Factory_Dimension.split('x')[-1]))
            Size = Factory_Dimension.split('x')[:-1] 
            Size.sort()
            Size = 'x'.join(Size)
            Naturali_Dimension = 'x'.join([Size, Thickness])
                
            mycursor.execute("""
                     insert ignore into Factory_Dimensions (FactoryID, Factory_Dimension, Naturali_Dimension) 
                     values (%s, \'%s\', \'%s\') ;""" %
                     (FactoryID, Factory_Dimension,Naturali_Dimension))  
            mydb.commit() 
            
            mycursor.execute(
                 """ select DimensionID from Dimension
                 where Size = \'%s\' and Thickness = \'%s\' 
                 and Finish = \'%s\' """
                 % (Size,Thickness, Finish)) 
            try:
                DimensionID = mycursor.fetchall()[0]  
                return DimensionID[0] 
            except:
                mycursor.execute("""
                    insert ignore into Dimension ( Type, Size, Thickness, Finish) 
                    values (\'%s\' , \'%s\' , \'%s\' ,\'%s\') ;""" %
                    (Type, Dimension, Thickness, Finish)) 
                mydb.commit() 
                mycursor.execute(
                     """ select DimensionID from Dimension
                     where Size = \'%s\' and Thickness = \'%s\' 
                     and Finish = \'%s\' """
                     % (Dimension,Thickness, Finish)) 
                print("New Dimension Added into DImension Table")
                DimensionID = mycursor.fetchall()[0]
                return DimensionID[0] 
            
        else: 
            mycursor.execute("""
                     insert ignore into Factory_Dimensions (FactoryID, Factory_Dimension) 
                     values (%s, \'%s\') ;""" %
                     (FactoryID, Factory_Dimension))  
            mydb.commit() 
        print("New Dimension", Factory_Dimension, FactoryID)
        
            
        
        Errors.append('Dimension ' )   
        return  
                    

 
           
# %%%% Find Prod Data
def cm_to_fraction(cm):
    inches = cm * (1 / 2.54) 
    fractions = {'1/4': 0.25, '1/2': 0.5, '3/4': 0.75, '1': 1, '1 1/4': 1.25}
    closest_fraction = min(fractions, key=lambda x: abs(inches - fractions[x]))
    return closest_fraction
 
def mysqlValues(FactoryID):
    mydb = mysql.connector.connect(
        host="naturalistone.cfbecwildn3j.us-east-1.rds.amazonaws.com",
        user = "admin",
        password="Ra7878782",
        database= "NaturaliStone",
        port = 3306)  
    
    mycursor = mydb.cursor() 
    #Get all avaiable Materials 
    mycursor.execute(
        'select distinct(Material) from ProdNames where Material is not null')
    Materials = [Material[0] for Material in mycursor.fetchall() ] 
     
    #Get all avaiable Finsishes
    mycursor.execute('select distinct(Finish) from Dimension where Finish is not null')
    Finishes = [Finish[0] for Finish in mycursor.fetchall() ]  
    
    # Sizes
    mycursor.execute(""" select distinct(Factory_Dimension) 
                     from Factory_Dimensions where 
                     Factory_Dimension is not null and FactoryID = %s """ % 
                     (FactoryID)) 
    AllSizes = [size[0] for size in mycursor.fetchall() ] 
    
    # PRODNAME ID   
    mycursor.execute(
         """ select ProdNameID, Factory_ProdName, Material, FactoryID   from ProdNames 
             where Factory_ProdName is not null and FactoryID = %s """ % 
             (FactoryID)) 
    ProdNames =  [ProdName  for ProdName in mycursor.fetchall() ]
      
    # PRODNAME ID  
    mycursor.execute(
         """ select DimensionID, ProdNameID, ProdID  from Products  """ )
    ProdIDs =  [ProdID for ProdID in mycursor.fetchall() ] 
    
    return Materials, Finishes, AllSizes, ProdNames, ProdIDs
    
def FindProd(line, FactoryID, Material ):
 
############################ Material  ########################################
    Errors = []
    Materials, Finishes, AllSizes, ProdNames, ProdIDs =  mysqlValues(FactoryID)
    try:
        
        line = line.replace('Quarzite','Quartzite')
        # if any(x in line for x in ['Marble', 'Quarzite']):
        #     Material = 'Marble' if 'M Arble' in line else 'Quartzite'
        if Material == '':  
            Material_best_match, highest_probability = max(((Matt, 
                            fuzz.token_set_ratio( line  , Matt)) 
                           for Matt in Materials), key=lambda x: (x[1], len(x[0])))  
            
            if highest_probability < 80: 
                Errors.append('Material') 
                raise ValueError()   
            else: 
                Material = Material_best_match
    
    ############################ ProdName  ########################################
    
        probabilities = [fuzz.token_set_ratio(line, value[1])
                         for value in ProdNames ] 
        
        FoundProds  = [ProdNames[index][1] for index, probability 
                   in enumerate(probabilities)   
                   if probability >= 85] 
        
        if len(FoundProds) == 0:  
            Errors.append('Product Name') 
            raise ValueError() 
        elif len(FoundProds) >= 2:
            probabilities = [fuzz.token_sort_ratio(line, value)
                             for value in FoundProds] 
            
            FoundProds  = [FoundProds[index]  for index, probability 
                       in enumerate(probabilities)   
                       if  probability == max(probabilities)  ] 
            
            if len(FoundProds) == 0: 
                Errors.append('Product Name') 
                raise ValueError() 
            else:
                ProdName = [Name for Name in FoundProds 
                              if Name == max([Name for Name in FoundProds],
                                                key = len)][0]  
        else:
            ProdName = [Name for Name in FoundProds 
                              if Name == max([Name for Name in FoundProds],
                                                key = len)][0]  
            
        # Get ProdName ID
        try:
            ProdNameID = [value for value in ProdNames if ProdName in 
                          value and Material in value][0][0] 
        except:
            ProdNameID = None 
            
    ############################ Finish    ########################################
        
        line = line.replace('M.A. + A-Zb Plus','AVP').replace('Arela','Bamboo')
        line = line.replace('Pixel','Pixel Honed') if FactoryID == 11 else line
        line = line.replace('Feng Shui','Barbed') if FactoryID == 12 else line
        
        
        if (FactoryID == 7 and "Komi" in line):
            Finish = "Natural"
            
        if FactoryID == 109  :
            Finish = "Polished"
            
        elif FactoryID == 3: 
            Finish = 'Polished' if 'lx' in line or 'lux' in line else 'Matte'
        
        elif any(finish in line for finish in Finishes):  
            Finish = [finish for finish in Finishes if finish in line ]
            
            if len([finish for finish in Finish if
                all(x in finish for x in ['Brushed', 'Honed'])]) == 1:
                Finish = [finish for finish in Finish if 
                          all(x in finish for x in ['Brushed', 'Honed'])][0]
            
            elif len(Finish)  != 1:
                Finish_best_match, highest_probability = max(((Finish, 
                                fuzz.token_set_ratio(line, Finish)) 
                               for Finish in Finishes), key=lambda x: (x[1], len(x[0])))
                Finish = Finish_best_match
                if highest_probability < 80: 
                    Errors.append('Finish') 
                    raise ValueError() 
            else:
                Finish = Finish[0]
          #  FinishIndex = LineSplit.index(Finish)
        
        else:
            line = line.replace('Lether','Leather')
            Finish_best_match, highest_probability = max(((Finish, 
                            fuzz.token_set_ratio(line, Finish)) 
                           for Finish in Finishes), key=lambda x: (x[1], len(x[0])))
            
            if highest_probability < 80: 
                Errors.append('Finish') 
                raise ValueError() 
            else:
                Finish = Finish_best_match
         
    ############################ Dimension ########################################
    
        line = line[:line.find(ProdName)].replace('"','').replace(' ','').lower() if FactoryID == 9 else line  
        line = line.replace('"','').replace(' ','').lower() if FactoryID == 11 else line  
        
        if FactoryID == 11 and 'slab' in line: 
            try:
                Size = re.findall('[0-9]+x[0-9]+x[0-9]+',line)[0]
            except:
                Thickness = re.findall('[0-9]+cm',line)[0].replace('cm','')
                Size = re.findall('[0-9]+x[0-9]+',line)[0]
                Size = 'x'.join([Size,Thickness])
                
            if any(x == Size for x in AllSizes):
                Size = Size 
                
        elif FactoryID == 109:
            Thickness = re.findall('[0-9]+Cm',line)[0].replace('Cm','')
            Size = re.findall('[0-9]+ X [0-9]+',line)[0].replace(' ','').lower()
            Size = 'x'.join([Size,Thickness])
            
        elif any(Size in line.lower().replace(' ','') for Size in AllSizes):  
            Size = [Size for Size in AllSizes if Size in line.lower().replace(' ','') ][0]
            
        elif FactoryID == 7 and any('x'.join(Size.split('x')[:-1]) 
                                      in line.lower() for Size in AllSizes):
            
            FoundSizes = ['x'.join(Size.split('x')[:-1])  for Size in AllSizes if 
                          'x'.join(Size.split('x')[:-1]) in line.lower() ]
            FoundThicknesses = [Thickness.split('x')[-1] for Thickness in AllSizes
                            if Thickness.split('x')[-1].replace('.',',') in 
                             line.split(ProdName)[1].replace(' ','')]
            
            Size = [f'{val1}x{val2}' for val1 in FoundSizes 
                                        for val2 in FoundThicknesses]
            if len(Size) != 1:     
                Errors.append('Size') 
                raise ValueError()  
            else:
                Size = Size[0]
              
        elif FactoryID == 9:
            Size = line 
            mycursor.execute("""
                     insert ignore into Factory_Dimensions 
                     (FactoryID, Naturali_Dimension, Factory_Dimension) 
                     values (%s, \'%s\' , \'%s\') ;""" %
                     (FactoryID, Size, Size)) 
            
            mydb.commit()
         
        elif FactoryID == 11:
            if 'Slab' in line:
                try:
                    Size = re.findall('[0-9]+x[0-9]+x[0-9]+',line)[0]
                except:
                    Thickness = re.findall('[0-9]+cm',line)[0].replace('cm','')
                    Size = re.findall('[0-9]+x[0-9]+',line)[0]
                    Size = 'x'.join([Size,Thickness])
                     
                Size_list = Size.split('x')
                Factory_Size = Size
                Size = 'x'.join([str(int(float(dim) * (1 / 2.54))) 
                         if i != len(Size_list) - 1 else cm_to_fraction(float(dim)) 
                         for i, dim in enumerate(Size_list)])
            else:
                Size = re.findall('[0-9]+x[0-9]+x[0-9]/[0-9]',line)[0]
                Factory_Size = Size 
                
            mycursor.execute("""
                     insert ignore into Factory_Dimensions 
                     (FactoryID, Naturali_Dimension, Factory_Dimension) 
                     values (%s, \'%s\' , \'%s\') ;""" %
                     (FactoryID, Size.lower(), Factory_Size.lower())) 
            
            mydb.commit()
            print('Inserted %s in Factory_Dimensions' % Size)
             
        else:
            Errors.append('Size') 
            raise ValueError()  
        
        return Material, Finish, Size, ProdName, ProdNameID
        #print(Material, Finish, Size, ProdName, ProdNameID)
    except:
        return 'Error', Errors 
       #print(Errors)
       
# %%%  Parse Data Funtions. One for each factory.
# %%%% FondoValle Function


def FondoValle(InvoiceText, FactoryID):
    """ 
    This function parses Belotti invoices and returns a dataframe
    containing product information for each product in the Order. 
    """
     
#### Product Data 
    # If the order doesnt exist and its not custom then add products. 
    text = InvoiceText
    Prod_temp_df = pd.DataFrame( )
    Error = []
    
    try:
        for group in [x for x in text.split('Descrizione'
                        )[1].split('\n') if 'NI8AB' in x and
                          "CRATE" not in x][:-1]:
            
            group = group.title() 
            
            Results = FindProd(group, FactoryID, 'Porcelain')
            if 'Error' in Results:
                Error = Results[1]
                raise ValueError()   
            else:
                Material, Finish, Size, ProdName, ProdNameID = Results
                
            Prodline = list(filter(lambda x: x != '', group.split(' ')))
          
            pckg = [CrateLine for CrateLine in 
                    text.title().split(group)[1].split('Ni8Ab')[0].split('\n') 
                    if 'Crate' in CrateLine][0]
            pckgTotal = float(pckg.split(' ')[-2].replace('.','').replace(',','.'))  
            
            ProdTotal = float(Prodline[Prodline.index('Ni8Ab')-1].replace('.','').replace(',','.'
                               ).replace('Ni8Ab',''))  
            
            if int(Size.split('x')[0]) * int(Size.split('x')[1]) / 10000 > 3:
                Type = 'Slab'
                ProdQuant = Prodline[Prodline.index('Mq')-1]
            else:
                Type = 'Tile'
                ProdQuant = int(float(Prodline[Prodline.index('Mq')+1] .replace(
                    '.','').replace(',','.')) * 10.76 )
 
            Price = round((pckgTotal + ProdTotal) / ProdQuant * eurusd,3)   
            
            Capacity = pp.predict_quantity(
                round(float(Size.split('x')[-1].replace('Mm','')) * .0393700787 / 25,2) * 25, Type)
            
            ShippingCost = FreightCost / Capacity
            
            TotalCost = ShippingCost + Price
            
            SalePrice = round(ROI(Material, Type) * TotalCost,2)
                     
            
            newdf = pd.DataFrame.from_dict({'ProdCode':[ProdName],
                                            'Finish': [Finish],
                                            'Size':[Size], 
                                            'Quantity': [ProdQuant],
                                            'Price':[Price],
                                            "Shipping_Cost":[ShippingCost],
                                            'SalePrice':[SalePrice],
                                            'Material':[Material]})
            
            Prod_temp_df = Prod_temp_df.append(newdf) 
        
        return Prod_temp_df, 'Success'
    except: 
        Error.append(group)
        return Error, 'Failed'
    
    
    
# %%%% Ricchetti Function


def Ricchetti(InvoiceText, FactoryID):
    """ 
    This function parses Belotti invoices and returns a dataframe
    containing product information for each product in the Order. 
    """
     
#### Product Data 
    # If the order doesnt exist and its not custom then add products. 
    text = InvoiceText
    Prod_temp_df = pd.DataFrame()
    
    try:
        for group in [x for x in text.split('\n') if 'N8A' in x] :
            
                      
            Prodline = list(filter(lambda x: x != '', group.split(' ')))
             
            ProdQuant = int(float(Prodline[Prodline.index('MQ')+1].replace(
                '.','').replace(',','.')) * 10.76 )
            
            if ProdQuant < 22: # Sample Flag
                continue
            
            Results = FindProd(group.title(), FactoryID, 'Porcelain') 
            
            if 'Error' in Results:
                if 'Size' in Results[1]: 
                    size = re.findall('[0-9]+x[0-9]+', group.replace('X','x'))[0] 
                        
                    Dimension(size.lower(), None, FactoryID)
                Error = Results[1]
                raise ValueError()   
            else:
                Material, Finish, Size, ProdName, ProdNameID = Results
                
            Type = 'Tile' 
            
            Price = round(float(Prodline[Prodline.index('N8A')-1].replace(',','.')) 
                          / ProdQuant  * eurusd,3) 
             
            thickness = 3/8 
            
            Capacity = pp.predict_quantity( thickness , Type)
            
            ShippingCost = FreightCost / Capacity
            
            TotalCost = ShippingCost + Price
            
            SalePrice = round(ROI(Material, Type) * TotalCost,2)
                     
            
            newdf = pd.DataFrame.from_dict({'ProdCode':[ProdName],
                                            'Finish': [Finish],
                                            'Size':[Size], 
                                            'Quantity': [ProdQuant],
                                            'Price':[Price],
                                            "Shipping_Cost":[ShippingCost],
                                            'SalePrice':[SalePrice],
                                            'Material':[Material]})
            
            Prod_temp_df = Prod_temp_df.append(newdf) 
            
        return Prod_temp_df, 'Success'
    except: 
        Error.append(group)
        return Error, 'Failed'
    
# %%%% Belotti Function


def Belotti(InvoiceText, FactoryID):
    """ 
    This function parses Belotti invoices and returns a dataframe
    containing product information for each product in the Order. 
    """
     
#### Product Data 
    # If the order doesnt exist and its not custom then add products. 
    text = InvoiceText 
    Prod_temp_df = pd.DataFrame(columns= [ 'ProdCode','Finish',
                                          'Size','Quantity','Price'])
    Error = []
    
    ProducLines = [x for x in text.split('\n') if ('Color' in x or 'NI8B' in x) and 'EURO' not in x]
    
    current_sublist, sublists = 0, [[]]
    for line in ProducLines:
        if 'Color' in line and sublists[current_sublist]:
            sublists.append([])
            current_sublist += 1
        sublists[current_sublist].append(line)
    
    try:
        for group in sublists: 
            
            ni8b_lines = '\n'.join(group)
            originalGroup = group
            if 'PACKING' in originalGroup[0]:
                continue
            
            #group = group.title()
           # lines = group.split('\n') # split the text into lines
            #ni8b_lines = '\n'.join([line for line in lines if 'Ni8B' in line]) # keep only lines containing 'NI8B' 
            
            Results = FindProd(ni8b_lines, FactoryID, 'Terrazzo') 
            if 'Error' in Results:
                if 'Size' in Results[1]:
                    try:
                        Size = re.findall('[0-9]+X[0-9]+X[0-9].[0-9]', ni8b_lines)[0] 
                    except:
                        Size =  re.findall('[0-9]+X[0-9]+X[0-9]+', ni8b_lines)[0]
                        
                    Dimension(Size.lower(), None, FactoryID)
                if 'Product Name' in Results[1]: 
                    Name = ' '.join(ni8b_lines.split('\n')[0].replace(
                            ':','').strip().split(' ')[:-1])   
                    ProdName(Name, FactoryID)
                Error = Results[1]
                raise ValueError()   
            else:
                Material, Finish, Size, ProdName, ProdNameID = Results
           
            Prodline = ' '.join([x for x in group if 'PACKING' not in x]).title().split(' ')
            try:
                pckgLine = [x for x in group if 'PACKING' in x][0]
                pckgTotal = float(pckgLine.split(
                    ' ')[-2].replace('.','').replace(',','.'))  
            except: 
                pckgTotal = 0
                
            ProdTotal = float(Prodline[-2].replace('.','').replace(',','.'))
             
            if  any('Tile' in x for x in Prodline): 
                Type = 'Tile'
                ProdQuant = int(float(Prodline[-4].replace(
                    '.','').replace(',','.')) * 10.76 )
                
            elif any('Slab' in x for x in Prodline): 
                Type = 'Slab'
                try:
                    ProdQuant = int(re.findall('[0-9]+',Prodline.split('N.')[1])[0])
                except:  
                    ProdQuant = int(Prodline[Prodline.index([piece
                            for piece in ['Pcs','Pieces'] 
                        if piece in Prodline][0])-1]) 
                 
            Price = round((pckgTotal + ProdTotal) / ProdQuant * eurusd,3) 
            
            # newdf = pd.DataFrame.from_dict({'ProdCode':[ProdName], 
            #                                 'Finish': [Finish],
            #                                 'Size':[Size], 
            #                                 'Quantity': [ProdQuant],
            #                                 'Price':[Price]})
             
            Capacity = pp.predict_quantity(
                round(float(Size.split('x')[-1]) * .393700787 / 25,2) * 25, Type)
            
            ShippingCost = FreightCost / Capacity
            
            TotalCost = ShippingCost + Price
            
            SalePrice = round(ROI(Material, Type) * TotalCost,2)
                     
            
            newdf = pd.DataFrame.from_dict({'ProdCode':[ProdName],
                                            'Finish': [Finish],
                                            'Size':[Size], 
                                            'Quantity': [ProdQuant],
                                            'Price':[Price],
                                            "Shipping_Cost":[ShippingCost],
                                            'SalePrice':[SalePrice],
                                            'Material':[Material]})
            
            Prod_temp_df = Prod_temp_df.append(newdf) 
        
        return Prod_temp_df, 'Success'
    except: 
        Error.append(group)
        return Error, 'Failed'
    
    
        
            
    
# %%%% Marmi Scala Function

def Marmi(InvoiceText):
    """ 
    This function parses Marmi Scale invoices and returns a dataframe
    containing product information for each product in the Order. 
    """
      
    text = InvoiceText
        
    Prod_temp_df = pd.DataFrame(columns= ['ProdCode','Finish',
                            'Size','Quantity', 'Price'])
    Error = []
    
    Material = 'Terrazzo'
    
    try:
        for group in text.split('AGGLO')[1:]:
        
            Name = 'Agglo' + ' '.join(group.split("\n")[0].split(' ')[:-1]
                                      ).title().rstrip().strip() 
            Finish = group.split("\n")[0].split(' ')[-1].title()   
            
            groupIndex = True if (text.split('AGGLO')[1:].index(group) == 
                                  (len(text.split('AGGLO')[1:]) - 1)) else False
            
            group = ('\n'.join(group.split('\n')[0: group.split('\n').index(' ')]) 
                              if groupIndex else group)
            groupSplitted =  group.split('\n')
            
            for line in groupSplitted:
                LineSplit = line.split(" ")
                 
                    
                if 'Tile' in line:
                    Type = 'Tile'
                    
                    # Price sqm / 10.76 to convert to price sqft * eurusd
                    Price = round(float(LineSplit[-2].replace('.','').replace(
                        ',','.')) / 10.76 * eurusd,3) 
                    try: 
                        size = re.findall('[0-9]+x[0-9]+\s[0-9]+,[0-9]+', 
                                          line)[0].replace(
                                              ' ','x').replace(',','.')
                    except: 
                        size = re.findall('[0-9]+x[0-9]+\s[0-9]+', 
                                          line)[0].replace(' ','x') 
                    thickness = float(size.split('x')[-1])
                    ProdQuant = float(LineSplit[-3].replace(
                        '.','').replace(',','.')) * 10.76
                    
                    size = 'x'.join(size.split('x')[:-1])  
                    
                    
                elif 'Slab' in line:
                    Type = 'Slab'
                    total = float(LineSplit[-1].replace('.','').replace(',','.'))                     
                    Price = round(total  * eurusd / int(re.findall(
                        '[0-9]+',group.split(line)[1].split('N.')[1])[0]) ,2) 
                    
                   # pattern = r"N\.\s*\d+\s*da cm\.\s*(\d+\s*x\s*\d+\s*x\s*\d+)"
                   # matches = re.findall(pattern, text)
                    size = 'x'.join(re.findall('[0-9]+',
                           groupSplitted[groupSplitted.index(line)+1].split('N.')[1])[1:])
                    
                    thickness = float(re.findall('[0-9]+',groupSplitted[
                        groupSplitted.index(line)+1].split('N.')[1])[-1])
                    
                    ProdQuant = re.findall('[0-9]+',groupSplitted[
                        groupSplitted.index(line)+1].split('N.')[1])[0]
                                        
                    size = 'x'.join(size.split('x')[:-1]).replace('.0','') 
                    
                if any(x in line for x in ['Tile','Slab']):
                    Capacity = pp.predict_quantity(
                        round(thickness * .393700787 / 25,2) * 25, Type)
                    
                    ShippingCost = FreightCost / Capacity
                    
                    TotalCost = ShippingCost + Price
                    
                    SalePrice = round(ROI(Material, Type) * TotalCost,2)
                             
                    
                    newdf = pd.DataFrame.from_dict({'ProdCode':[Name],
                                                    'Finish': [Finish],
                                                    'Size':[size + 'x' + 
                                                            str(thickness).replace('.0','')], 
                                                    'Quantity': [ProdQuant],
                                                    'Price':[Price],
                                                    "Shipping_Cost":[ShippingCost],
                                                    'SalePrice':[SalePrice],
                                                    'Material':[Material]})
                    
                    Prod_temp_df = Prod_temp_df.append(newdf)
        
        return Prod_temp_df, "Success"
        
    except:
        
        Error.append(line)
        return Error, 'Failed'
        
        
# %%%% Stone District Function
    
def Stone_District(InvoiceText, FactoryID):
    """ 
    This function parses Belotti invoices and returns a dataframe
    containing product information for each product in the Order. 
    """
     
#### Product Data 
    # If the order doesnt exist and its not custom then add products. 
    text = InvoiceText 
    Prod_temp_df = pd.DataFrame(columns= [ 'ProdCode','Finish',
                                          'Size','Quantity','Price'])
    Error = []
    
    
    ProductLines = text.split('DESCRIPTION')[1].split('DISCLAIMER')[0].split('\n')[1:-1]
    
    Indexes = [ProductLines.index(x) for x in ProductLines  if re.search(r'[ML]\d+-',x)  ]
    
    Producs = [' '.join(ProductLines[x : Indexes[Indexes.index(x) + 1 ]] )
                 if x != max(Indexes) else 
                 ' '.join(ProductLines[x : len(ProductLines) ] )
                 for x in Indexes ]
    
    try:
        for group in Producs:
            
            originalGroup = group 
            group = ' '.join(group.title().split(' ')[1:])
            
           
            Results = FindProd(group, FactoryID, '')
            if 'Error' in Results:
                if 'Size' in Results[1]:
                    try:
                        Size = re.findall('[0-9]+X[0-9]+X[0-9]', 
                                          group.replace('"','').replace(' ',''))[0] 
                    except:
                        pass
                        
                    Dimension(Size.lower(), None, FactoryID)
                if 'Product Name' in Results[1]: 
                    Name = ' '.join(group.split(' ')[5:7])
                    ProdName(Name, FactoryID)
                Error = Results[1]
                raise ValueError()   
            else:
                Material, Finish, Size, ProdName, ProdNameID = Results
                
                 
            Prodline =  [item for item in text.split('\n') 
                              if originalGroup.split(' ')[0] in 
                              item.title()][0].split(' ')
                
            Price = float(Prodline[-2].replace(',',''))
             
            if 'Slab' in group: 
                ProdQuant = int(group.split(' ')[group.split(' ').index('Slab')-1])
                Price = float(Prodline[-1].replace(',','')) / ProdQuant
            else: 
                ProdQuant =  float(Prodline[-3].replace(',',''))
                
            Type = 'Tile' if 'Tile' in group else 'Slab' if 'Slab' in group else 'Paver' if 'Paver' in group else None 
                
            SalePrice = round(ROI(Material, Type) * Price,2)
            
            newdf = pd.DataFrame.from_dict({'ProdCode':[ProdName],
                                            'Finish': [Finish],
                                            'Size':[Size], 
                                            'Quantity': [ProdQuant],
                                            'Price':[Price], 
                                            'SalePrice':[SalePrice],
                                            'Material':[Material]})
            
            Prod_temp_df = Prod_temp_df.append(newdf) 
              
        return Prod_temp_df, 'Success'
    except: 
        Error.append(group)
        return Error, 'Failed'

# %%%% UMI Function
    
def UMI(InvoiceText, FactoryID):
    """ 
    This function parses UMI invoices and returns a dataframe
    containing product information for each product in the Order. 
    """
     
#### Product Data 
    # If the order doesnt exist and its not custom then add products.  
    Prod_temp_df = pd.DataFrame(columns= [ 'ProdCode','Finish', 'Size','Quantity','Price'])
    Error = []
    text = InvoiceText
     
    ProductLines = text.split('tem Description')[1].split('Important Notices and')[0].split('\n')[1:-1]
 
    Indexes = [ProductLines.index(x) for x in ProductLines if 'SQFT' in x] 
    
    Producs =  [' '.join(ProductLines[0:x+1]) if x == min(Indexes) 
                else ' '.join(ProductLines[Indexes[Indexes.index(x)-1]+1:x+1]) if x != max(Indexes) 
                else ' '.join(ProductLines[Indexes[Indexes.index(x)-1]+1:len(ProductLines)]) 
                for x in Indexes]
       
    try:
        for group in Producs:
               
            Results = FindProd(group.title() , FactoryID, '')
            if 'Error' in Results:
                Error = Results[1]
                raise ValueError()   
            else:
                Material, Finish, Size, ProdName, ProdNameID = Results
                 
            Prodline =  list(filter(lambda spaces: spaces!='',group.replace('$','').split(' '))) 
                
            Price = float(Prodline[-2].replace(',',''))
             
            if any(int(x) > 80 for x in Size.split('x')): # Define SlabsN
                Type = 'Slab'
                ProdQuant = int(Prodline[0])
                Price = float(Prodline[-1].replace(',','')) / ProdQuant
            else: # Tile
                Type = 'Tile'
                ProdQuant =  float(Prodline[Prodline.index('SQFT')+1].replace(',',''))
                 
            SalePrice = round(ROI(Material, Type) * Price,2)
            
            newdf = pd.DataFrame.from_dict({'ProdCode':[ProdName],
                                            'Finish': [Finish],
                                            'Size':[Size], 
                                            'Quantity': [ProdQuant],
                                            'Price':[Price], 
                                            'SalePrice':[SalePrice],
                                            'Material':[Material]})
            
            Prod_temp_df = Prod_temp_df.append(newdf) 
              
        return Prod_temp_df, 'Success'
    except: 
        Error.append(group)
        return Error, 'Failed'

# %%%% StoneTek Function
    
def Stonetek(InvoiceText, FactoryID):
    """ 
    This function parses Belotti invoices and returns a dataframe
    containing product information for each product in the Order. 
    """
     
#### Product Data 
    # If the order doesnt exist and its not custom then add products. 
    text = InvoiceText 
    Prod_temp_df = pd.DataFrame(columns= [ 'ProdCode','Finish',
                                          'Size','Quantity','Price'])
    Error = []
    
    
    ProductLines = text.split('Description')[1].split('Prices shown Fo')[0].split('\n')[1:-1]
    Indexes = [ProductLines.index(x) for x in ProductLines  if 'sqft' in x] 
    Producs = [' '.join(ProductLines[x : Indexes[Indexes.index(x) + 1 ]] )
                 if x != max(Indexes) else 
                 ' '.join(ProductLines[x : len(ProductLines) ] )
                 for x in Indexes ]
    
    try:
        for group in Producs:
            
            originalGroup = group 
            group = ' '.join(group.title().split(' ')[1:])
             
            Results = FindProd(group, FactoryID, '')
            if 'Error' in Results:
                if 'Size' in Results[1]:
                    try:
                        Size = re.findall('[0-9]+X[0-9]+X[0-9]', 
                                          group.replace('"','').replace(' ',''))[0] 
                    except:
                        pass
                        
                    Dimension(Size.lower(), None, FactoryID)
                if 'Product Name' in Results[1]: 
                    Name = ' '.join(group.split(' ')[5:7])
                    ProdName(Name, FactoryID)
                Error = Results[1]
                raise ValueError()   
            else:
                Material, Finish, Size, ProdName, ProdNameID = Results
                
                 
            Prodline =  [item for item in text.split('\n') 
                              if originalGroup.split(' ')[0] in 
                              item.title()][0].split(' ')
                
            Price = float(Prodline[-3].replace(',',''))
             
            if 'Slab' in group: 
                ProdQuant = int(group.split(' ')[group.split(' ').index('Slab')-1])
                Price = float(Prodline[-1].replace(',','')) / ProdQuant
            else: 
                ProdQuant =  float(Prodline[-1].replace(',','')) / float(Prodline[-3].replace(',',''))
                
            Type = 'Slab' if 'Slab' in group else 'Tile'  
                
            SalePrice = round(ROI(Material, Type) * Price,2)
            
            newdf = pd.DataFrame.from_dict({'ProdCode':[ProdName],
                                            'Finish': [Finish],
                                            'Size':[Size], 
                                            'Quantity': [ProdQuant],
                                            'Price':[Price], 
                                            'SalePrice':[SalePrice],
                                            'Material':[Material]})
            
            Prod_temp_df = Prod_temp_df.append(newdf) 
              
        return Prod_temp_df, 'Success'
    except: 
        Error.append(group)
        return Error, 'Failed'
    
# %%%% Domos Function


def Domos(InvoiceText, FactoryID):
    """ 
    This function parses Belotti invoices and returns a dataframe
    containing product information for each product in the Order. 
    """
     
#### Product Data 
    # If the order doesnt exist and its not custom then add products. 
    text = InvoiceText 
    Prod_temp_df = pd.DataFrame(columns= [ 'ProdCode','Finish',
                                          'Size','Quantity','Price'])
    Error = []
    
    
    ProductLines = text.split('Description')[1].split('Italy')[0].split('\n')[2:-1]
    
    if [ProductLines.index(x) for x in ProductLines 
         if 'I80' ==  x.split(' ')[-1] ][0] < [ProductLines.index(x) 
                      for x in ProductLines if any(code in x.replace(' ','') 
                                   for code in ['MARBLE','QUARZITE']) ][0]:
             
        Indexes = [ProductLines.index(x) for x in ProductLines 
                             if 'I80' ==  x.split(' ')[-1] and 'nr' not in x ]
         
        empty_indexes = [index for index, item in enumerate(ProductLines) if item.strip() == '']
   
   
        Products = [ProductLines[x:Indexes[Indexes.index(x) + 1] - 1] 
                    if x != max(Indexes) else ProductLines[x:next(item 
                  for item in empty_indexes if item > max(Indexes))] for x in Indexes]
    else:
        
        Indexes = [ProductLines.index(x) for x in ProductLines 
                   if 'I80' ==  x.split(' ')[-1] and 'nr' not in x ]
         
        empty_indexes = [index for index, item in enumerate(ProductLines) if item.strip() == '']
        
        Products = [ProductLines[
                next(item for item in empty_indexes if item < x):
                next(item for item in empty_indexes if item > max(Indexes))]
                    if x != min(Indexes) 
                    else ProductLines[0:empty_indexes[0]] for x in Indexes]

        
    try:
        for group in Products: 
            
            originalGroup = group
            group = [item[0] + item[2:] if item != ' ' and item[1] == ' ' 
                             else item for item in group]
            group = ' '.join(group).title() 
            
            if any(x in group for x in ['Marble', 'Quarzite']) == False:
                prev = Products[Products.index(originalGroup) - 1]
                group = ' '.join([group,[item for item in prev if any(x in item 
                                  for x in ['M ARBLE', 'Q UARZITE']) ][0]]) 
                group = group.title().replace('M Arble','Marble'
                                      ).replace('Q Uarzite','Quarzite')
            
            
            Results = FindProd(group, FactoryID, '')     
            if 'Error' in Results: 
                Error = Results[1]
                raise ValueError()   
            else:
                Material, Finish, Size, ProdName, ProdNameID = Results
                 
            Prodline =  [item for item in originalGroup
                              if  'I80' ==  item.split(' ')[-1]][0].split(' ')
                 
            if 'No.' in group: 
                ProdQuant = int(Prodline[Prodline.index('No.')+1])
            else: 
                ProdQuant =  float(Prodline[-4].replace(',','.'))
                   
            if 'Tile' in group:
                Type = 'Tile'
                Price = round(float(Prodline[-3].replace(',','.')) * eurusd,3)
                # Convert inch to cm 
                thickness = float(Fraction(Size.split('x')[-1])) *  2.54
                
            elif 'Slab' in group:
                Type = 'Slab'
                thickness = float(Size.split('x')[-1])
                Price = round(float(Prodline[-2].replace('.','').replace(',','.')) 
                              / ProdQuant * eurusd,3)
                
            Capacity = pp.predict_quantity(
                round(thickness * .393700787 / 25,2) * 25, Type)
            
            ShippingCost = FreightCost / Capacity
            
            TotalCost = ShippingCost + Price
            
            SalePrice = round(ROI(Material, Type) * TotalCost,2)
                     
            
            newdf = pd.DataFrame.from_dict({'ProdCode':[ProdName],
                                            'Finish': [Finish],
                                            'Size':[Size], 
                                            'Quantity': [ProdQuant],
                                            'Price':[Price],
                                            "Shipping_Cost":[ShippingCost],
                                            'SalePrice':[SalePrice],
                                            'Material':[Material]})
            
            Prod_temp_df = Prod_temp_df.append(newdf) 
             
        return Prod_temp_df, 'Success'
    except: 
        Error.append(group)
        return Error, 'Failed'
    
    
        
                               

# %%% Get Invoices. For loop for invoices in folder. 
 

def Parse_Factory_Invoice(invoice):
    try:
        
#################################### SETUP ####################################

        global mydb
        mydb = mysql.connector.connect(
            host="naturalistone.cfbecwildn3j.us-east-1.rds.amazonaws.com",
            user = "admin",
            password="Ra7878782",
            database= "NaturaliStone",
            port = 3306)  
        
        global mycursor
        mycursor = mydb.cursor()
        
        mycursor.execute("select max(TotalCost) TotalCost, " + 
                         "CompanyName from FreightInvoices FR " + 
                 "right join Freight on Freight.FreightKey = FR.FreightKey " +
                 "where CompanyName = 'GENERAL NOLI'" +
                 "group by TotalCost " )
        
        global FreightCost
        FreightCost = mycursor.fetchall()[0][0]
        FreightCost = 12000
         
        
        global Errors
        Errors = []
         
        url = ('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol' + 
               '=EUR&to_symbol=USD&apikey=demo')
        r = requests.get(url)
        data = r.json()
        today = data['Meta Data']['5. Last Refreshed'][:-9]
        
        global eurusd
        eurusd = float(
            data['Time Series FX (Daily)'][
            data['Meta Data']['5. Last Refreshed'][:-9]]['4. close'])   
        
        ProdData = pd.DataFrame(columns= ['Type','ProdCode','Finish',
                                'Size','thickness','Quantity','Price'])
        
        (InvoiceValue, FactoryID, InvoiceDate, 
         InvoiceNum, EstDeliveryDate, Payment,
         FreightID, OrderBy) = None,None,None,None,None,None,None,None
        
        with pdfplumber.open(invoice) as pdf: 
            pages = pdf.pages  
            text = '\n'.join([x.extract_text() for x in pages])
            
       # pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
        #pageObj = pdfReader.getPage(0) 
        
        mycursor.execute("select FactoryID, Factory_Name from Factory " ) 
        FactoryID = mycursor.fetchall() 
         
################################# ORDER DATA ##################################
 
        if all(s in text for s in ['1101379', 'INVOICE' ]):  
            
            FactoryName = 'MarmiScala'
            
            if  'Proforma Invoice' in text.title().split('Document N° ')[0]:
                
                InvoiceNum = re.findall('[0-9]+',text.split('Page')[1])[0]
                
                move_file_with_rename(invoice, InvoiceNum,
                  './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Proformas//' ) 
                return print("Moved to Factory Proforma", FactoryName, InvoiceNum ) 
        
            
            proformasReferenced = [re.findall('[0-9]+',x)[0]
                   for x in re.findall('Proform a n.[0-9]+',text)]
            
            InvoiceDate =  datetime.strptime(
                re.findall('[0-9]+/[0-9]+/[0-9]+', text)[0], '%d/%m/%Y')
            InvoiceNum = re.findall('[0-9]+',text.split('Page')[1])[0]
            InvoiceValue = float(text.split('Euro')[1].split("\n"
                                   )[0].replace('.','').replace(',','.'))
            
            Material = 'Terrazzo'
            FactoryID = [Factory[0] for Factory in FactoryID 
                         if FactoryName == Factory[1]][0]
            
            if not(checkExisting(text, InvoiceNum, invoice, FactoryName)): 
                ProdData, Status = Marmi(text)
            else: 
                return
            
        elif all(s in text for s in ['info@belottitiles.com', 'DATA / DATE', 
                                     'DESCRIZIONE / DESCRIPTION']):  
                    
            FactoryName = 'Belotti'
        #### Order Primary Data  
            InvoiceDate = datetime.strptime(
                re.findall('[0-9]+/[0-9]+/[0-9]+', text)[0], '%d/%m/%Y')
            InvoiceNum =  text.split(re.findall(
                  '[0-9]+/[0-9]+/[0-9]+', text)[0])[0].split('\n')[-1].rstrip(
                      ).replace('REV','').replace('/0','.')
            if text.split('Italy')[1].split('\n')[1].title() == 'Proforma Invoice':
                move_file_with_rename(invoice, InvoiceNum,
                  './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Proformas//' ) 
                return print("Moved to Factory Proforma", FactoryName, InvoiceNum ) 
            elif 'INVOICE' in text:
                 
                proformasReferenced = re.findall(r'Re\. Prof\. Invoice n\. (\S+)', text)
                if proformasReferenced == []:
                    proformasReferenced = re.findall(r'Re\. Proforma Invoice n\. (\S+)', text)
                    proformasReferenced2 = re.findall(r'Re\. Proforma Invoice n\.(\S+)', text)
                    proformasReferenced = proformasReferenced + proformasReferenced2
                    
                InvoiceNum =  int(InvoiceNum)
                InvoiceValue = re.findall('[0-9]+',text.split(
                    'TOTALE FATTURA')[-1].split("\n")[1].replace('.',''))[0] 
                OrderBy = list(filter(lambda x: ('@' in x) & ('belotti' not in x), 
                                      text.split(' ')))[0].split('\n')[0]   
                FactoryID = [Factory[0] for Factory in FactoryID 
                             if FactoryName == Factory[1]][0]
                    
                if not(checkExisting(text, InvoiceNum, invoice, FactoryName)):  
                    ProdData, Status = Belotti(text, FactoryID)
                else: 
                    return 
                
        elif (all(s in text for s in ['FONDOVALLE','Invoice']) or
              all(s in text for s in ['Fondovalle','Invoice']) ):
            
                FactoryName = 'Ceramica Fondovalle'   
                InvoiceDate =  datetime.strptime(re.findall('[0-9]+.[0-9]+.[0-9]+',                 
                                text.split('Date')[1])[0].replace('.','/'), '%d/%m/%Y') 
                InvoiceNum =  (text.split('Invoice No.')[1].split('\n')[0]
                              ).strip().split(' ')[0]
                
                if  'Proforma Invoice' in text.title().split('Payment Terms')[0]:
                      
                    move_file_with_rename(invoice, InvoiceNum,
                      './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Proformas//' ) 
                    return print("Moved to Factory Proforma", FactoryName, InvoiceNum ) 
                # else: 
                #     move_file_with_rename(invoice, InvoiceNum,
                #         './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Invoices//' ) 
                #     return print("Moved to Factory Invoice", FactoryName, InvoiceNum ) 
                    
             
                proformasReferenced = [x.split('Ordine n.')[1].split(' ')[1]
                                       for x in text.split('\n') if 'Ordine n.' in x]
                
                InvoiceValue = float(re.findall('[0-9]+.[0-9]+',text.split('VAT rate')[1].split(
                    'Total Amount')[1].split("\n")[0].replace('.','').replace(',','.').strip())[0])
                    
                FactoryID = [Factory[0] for Factory in FactoryID 
                              if FactoryName == Factory[1]][0]
                if not(checkExisting(text, InvoiceNum, invoice, FactoryName)):  
                    ProdData, Status = FondoValle(text, FactoryID)  
                else: 
                    return 
              #  Status = 'Failed'
                 
        elif (all(s in text.title() for s in ['Ricchetti', 'Invoice' ]) or
              all(s in text.title() for s in ['Ricchetti', 'Proforma']) ):
            
                FactoryName = 'Gruppo Ceramiche Ricchetti'     
                
                DocLine = [InvoiceLine.strip() for InvoiceLine in 
                            text.split('\n') if '00070873' in InvoiceLine ][0]
                
                InvoiceDate =  datetime.strptime(re.findall('[0-9]+/[0-9]+/[0-9]+',
                                DocLine)[0], '%d/%m/%y') 
                InvoiceNum =  re.findall('[0-9]+', DocLine)[0]
                
                InvoiceValue = float(text.split('Tot.Inv.')[1].split(
                    '\n')[0].strip().replace('.','').replace(',','.'))
                  
                if  DocLine.split(' ')[0] == 'PROFORMA':
                      
                    move_file_with_rename(invoice, InvoiceNum,
                      './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Proformas//' ) 
                    return print("Moved to Factory Proforma", FactoryName, InvoiceNum ) 
                
                proformasReferenced = [re.findall('[0-9]+',x)[0]
                   for x in re.findall('our ord.n \s+ [0-9]+',text)]
                     
                FactoryID = [Factory[0] for Factory in FactoryID 
                              if FactoryName == Factory[1]][0]  
                if not(checkExisting(text, InvoiceNum, invoice, FactoryName)):  
                    ProdData, Status = Ricchetti(text, FactoryID)
                else: 
                    return 
                
        elif  'Domos Srl' in text and 'PACKING LIST' not in text :  
        
            FactoryName = 'Domos' 
            
            InvoiceDate = datetime.strptime(
                  re.findall('[0-9]+/[0-9]+/202[0-9]+', text)[0], '%d/%m/%Y') 
              
            InvoiceNum =  re.findall('[0-9]+',re.findall( '[0-9]+/202[0-9]+', text)[0] )[0] 
              
            if ('F ATTURA PROFORMA' in  text.split('Cod. Pag. Descrizione')[0] or 
                'P ROFORMA INVOICE' in  text.split('Cod. Pag. Descrizione')[0] ):
                
                move_file_with_rename(invoice, InvoiceNum,
                  './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Proformas//' ) 
                return print("Moved to Factory Proforma", FactoryName, InvoiceNum ) 
            elif 'I NVOICE' in text:
                #### Order Primary Data   
                InvoiceValue = float(re.findall('[0-9]+,[0-9]+',text.replace('.','').split(
                      'EUR')[1])[0].replace(',','.')) 
                   
                FactoryID = [Factory[0] for Factory in FactoryID 
                              if FactoryName == Factory[1]][0]
                
                if not(checkExisting(text, InvoiceNum, invoice, FactoryName)):  
                    ProdData, Status = Domos(text, FactoryID)
                else: 
                    return

        elif all(s in text for s in ['info@stone-district.com' ]):  
        
            FactoryName = 'Stone District'
            date =  re.findall('[0-9]+/[0-9]+/[0-9]+', text)[0]
            InvoiceDate = datetime.strptime(date, '%m/%d/%Y') 
            
            if "Sales Order" in text.split('\n')[:5]:
                InvoiceNum = [x.replace(date,'').strip() for x in text.split('\n') if date in x][0]
                move_file_with_rename(invoice, InvoiceNum,
                  './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Proformas//' ) 
                return print("Moved to Factory Proforma", FactoryName, InvoiceNum ) 
            
            InvoiceNum =  re.findall('[0-9]+',text.split('\n')[2])[0]
          #### Order Primary Data  
               
            InvoiceValue = float(re.findall('[0-9]+.[0-9]+',text.split(
                  'Subtotal')[1])[0].replace(',','')) 
              
            FactoryID = [Factory[0] for Factory in FactoryID 
                          if FactoryName == Factory[1]][0]
             
            if not(checkExisting(text, InvoiceNum, invoice, FactoryName)):  
                ProdData, Status = Stone_District(text, FactoryID)
            else: 
                return
             
        elif 'UMI, LLC' in text:
            FactoryName = 'UMI'
            date =  re.findall('[0-9]+/[0-9]+/[0-9]+', text)[0]
            InvoiceDate = datetime.strptime(date, '%m/%d/%Y') 
            
            if "Order Number" not in text.split('\n')[0]: 
                move_file_with_rename(invoice,  invoice.split('\\')[-1][:-4],
                  './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Other//' ) 
                return print("Moved to Factory Proforma", FactoryName,  invoice.split('\\')[-1][:-4] ) 
            
            InvoiceNum =  re.findall('[0-9]+',text.split('\n')[1])[-1]
          #### Order Primary Data  
               
            InvoiceValue = float(text.split( 'Total before C.Fee')[1].split('\n')[0].replace(',','').replace('$','')) 
              
            FactoryID = [Factory[0] for Factory in FactoryID 
                          if FactoryName == Factory[1]][0]
             
            if not(checkExisting(text, InvoiceNum, invoice, FactoryName)):  
                ProdData, Status = UMI(text, FactoryID)
            else: 
                return
        
        elif all(s in text for s in ['www.stonetek.us','Stonetek']):  
        
            FactoryName = 'Stonetek'
            date =  re.findall('[0-9]+/[0-9]+/[0-9]+', text)[0]
            InvoiceDate = datetime.strptime(date, '%m/%d/%Y') 
            
            if "Invoice" not in text.split('\n')[1]:
                InvoiceNum = [x.replace(date,'').strip() for x in text.split('\n') if date in x][0]
                move_file_with_rename(invoice, InvoiceNum,
                  './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Proformas//' ) 
                return print("Moved to Factory Proforma", FactoryName, InvoiceNum ) 
            
            InvoiceNum =  [x.replace(date,'').strip() for x in text.split('\n') if date in x][0]
          #### Order Primary Data  
               
            InvoiceValue = float(re.findall('[0-9]+.[0-9]+',text.split(
                  'Total FOB')[1])[0].replace(',','')) 
              
            FactoryID = [Factory[0] for Factory in FactoryID 
                          if FactoryName == Factory[1]][0]
             
            if not(checkExisting(text, InvoiceNum, invoice, FactoryName)):  
                ProdData, Status = Stonetek(text, FactoryID)
            else: 
                return 
            
        elif 'abkgroup.it' in text :
            
            FactoryName = 'ABK'   
            InvoiceDate =  datetime.strptime(re.findall('[0-9]+.[0-9]+.[0-9]+',                 
                            text.split('Date')[1])[0].replace('.','/'), '%d/%m/%Y') 
            InvoiceNum =  (text.split('Number')[1].split('\n')[0]
                          ).strip().split(' ')[0]
            
            if any(s in ' '.join(text.split('\n')[:5]) for s in ['ORDER CONFIRMATION', 'PRO FORMA']):
                  
                move_file_with_rename(invoice, InvoiceNum,
                  './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Proformas//' ) 
                return print("Moved to Factory Proforma", FactoryName, InvoiceNum ) 
            else: 
                move_file_with_rename(invoice, InvoiceNum,
                    './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Invoices//' ) 
                return print("Moved to Factory Invoice", FactoryName, InvoiceNum ) 
         
               
            FactoryID = [Factory[0] for Factory in FactoryID 
                          if FactoryName == Factory[1]][0]
              
        else:
            FactoryName = None
            #print('Logic not ready for this factory.') 
            if 'PACKING LIST' in text : 
                FactoryName = 'Packing List'
            elif ('bonotti.com' in text or # Bonotti
                  all(s in text for s in ['STONE TRADING INTERNATIONAL', 'PACKING LIST' ]) or # Bonotti
                  all(s in text for s in ['STONE TRADING INTERNATIONAL' , 'COMMERCIAL INVOICE' ])):  
                FactoryName = 'Bonotti'
            elif (all(s in text for s in ['coralegnami.it', 'PROFORMA' ]) or 
                  all(s in text for s in ['coralegnami.it' , 'INVOICE' ])):   
                FactoryName = 'coralegnami'
            elif 'Mosaic Solutions & More' in text:   
                FactoryName = 'Mosaic Solutions'    
            elif 'Coraldom USA' in text:   
                FactoryName = 'Coraldom USA'
            elif all(s in text for s in ['Tax ID # 20-5340381','Purchase Order']):  
                FactoryName = 'Austin Granite Direct'
            elif  'stone access inc' in text:    
                FactoryName = 'Stone Access'
            elif any(s in text for s in ['@stonebroker', 'STONE BROKER OF AMERICA' ]):
                FactoryName = 'STONE BROKER OF AMERICA' 
            elif all(s in text for s in ['MARMOL EXPORT',  'Unit Price']):
                FactoryName = 'Marmol'
            elif 'KERABEN' in text:
                FactoryName = 'Keraben'     
            elif 'ITIBA6N9 CCIN' in text: # Antica Ceramica Rubiera
                FactoryName = 'Antica Ceramica Rubiera'
                
            if FactoryName == None:
                return print('Logic not ready for this factory.') 
            else:
                move_file_with_rename(invoice,  invoice.split('\\')[-1][:-4],
                  './/InvoicesReceived//Order Factory//' + FactoryName + '//'  ) 
                return print("Moved to Factory ", FactoryName ) 
            #return
        
        
################################## PROD DATA ##################################

        if 'Failed' != Status:
            for i in range(0,len(ProdData)):  
                 
                Dimension(ProdData.iloc[i,2], ProdData.iloc[i,1], FactoryID, ProdData.iloc[i,-1] ) 
                ProdName(ProdData.iloc[i,0],FactoryID, ProdData.iloc[i,-1])
           
        else: 
            try:
                Errors = ' // '.join(ProdData)
            except: 
                Errors = ' // '.join(ProdData[0])                
            
        if Errors == [] and 'Failed' != Status:
                 
            # If the order already exists then dont add it again. 
            mycursor.execute("""
                     insert into Orders (OrderID, Value, FactoryID, InvoiceDate) 
                     values (\'%s\', %s, %s, \'%s\') 
                     ON DUPLICATE KEY UPDATE 
                     Value = %s , InvoiceDate = \'%s\';""" %
                     (InvoiceNum, InvoiceValue, FactoryID, InvoiceDate, 
                      InvoiceValue, InvoiceDate)) 
            
            mydb.commit()
                        
            try:
                # Create the list of tuples to insert
                data_to_insert = [(InvoiceNum, FactoryID, proforma) for proforma in proformasReferenced]
                
                # Prepare the query
                query = """
                    INSERT IGNORE INTO Proformas (Invoice, FactoryID, Proforma) 
                    VALUES (%s, %s, %s)
                """
                
                # Use executemany() to execute the query for all items in the list
                mycursor.executemany(query, data_to_insert) 
                # Commit the transaction
                mydb.commit()
            except:
                pass
            
            ProdIDs_Current_Order = []
            for index, row in ProdData.iterrows(): 
         
                DimensionID = Dimension(row['Size'], row['Finish'], FactoryID, row['Material'] ) 
                ProdNameID = ProdName(row['ProdCode'],FactoryID, row['Material']) 
                
                mycursor.execute(
                     """ select ProdID, Updated_Date from Products 
                     where ProdNameID = %s and DimensionID = %s """
                     % (ProdNameID, DimensionID))    
                try: 
                     ProdID = mycursor.fetchall()[0][0] 
                                         
                except:
                     # If it hasnt, then insert. Else do nothing.  
                     mycursor.execute(
                         ("insert into Products (ProdNameID, DimensionID, " +
                          "Updated_Date)" + 
                          " values (%s, %s, \'%s\' )") % 
                         (ProdNameID, DimensionID, InvoiceDate))
                     mydb.commit()
                     
                     mycursor.execute(
                          """ select ProdID  from Products 
                          where ProdNameID = %s and DimensionID = %s """
                          % (ProdNameID, DimensionID))  
                     ProdID = mycursor.fetchall()[0][0] 
                 
                    
# =============================================================================

                # # The SQL statement
                # sql = """
                #     INSERT INTO ProdOrdered (OrderID, FactoryID, ProdID, Quantity, PurchasePrice,SalePrice)
                #     VALUES (%s, %s, %s, %s, %s, %s)
                #     ON DUPLICATE KEY UPDATE 
                #         Quantity = VALUES(Quantity), 
                #         PurchasePrice = VALUES(PurchasePrice), 
                #         SalePrice = VALUES(SalePrice), 
                #         Status = 'Incoming'
                # """
                
                # # The values
                # val = (InvoiceNum, FactoryID, ProdID, row['Quantity'], row['Price'], row['SalePrice'])
                
                # # Execute the SQL statement
                # mycursor.execute(sql, val)
                
                # #Commit the transaction
                # mydb.commit()

                # PRODORDERED ID
                mycursor.execute(
                    ("select OrderID, FactoryID from ProdOrdered where " + 
                    "OrderID = \'%s\' and ProdID = %s and FactoryID =  %s") % 
                    (InvoiceNum , ProdID, FactoryID))
                ProdOrderID = mycursor.fetchall()
                
                if ProdOrderID == []:  
                    mycursor.execute(
                        ("insert ignore into ProdOrdered (OrderID,FactoryID, ProdID, " +
                          "Quantity, PurchasePrice, SalePrice) values (\'%s\',%s, %s, %s, %s, %s)")
                        % (str(InvoiceNum),FactoryID, ProdID, row['Quantity'], row['Price'], row['SalePrice']))
                    mydb.commit()    
                else: 
                    sql = """ update ProdOrdered 
                        set Quantity = %s, PurchasePrice = %s, SalePrice = %s, 
                        Status = 'Incoming' 
                        where OrderID = %s and ProdID = %s and FactoryID =  %s """
                    val = [row['Quantity'] , row['Price'], row['SalePrice'], str(InvoiceNum) ,ProdID, FactoryID]            
                    mycursor.execute(sql, val )
                    mydb.commit()
                    
# =============================================================================
                ProdIDs_Current_Order.append(ProdID)
                    
             # PRODORDERED ID
            mycursor.execute(
                 ("select ProdID from ProdOrdered where OrderID = \'%s\' and FactoryID = %s  ") % 
                 (InvoiceNum, FactoryID   ))
            ProdOrdered = mycursor.fetchall()
            
            for Prod in ProdOrdered:
                if Prod[0] not in ProdIDs_Current_Order: 
                    # Set Status = Canceled for each product not in the new list of prods.
                    mycursor.execute(
                        """update ProdOrdered set ProdOrdered.Status = 'Canceled'
                        where ProdID = %s and OrderID =  \'%s\'  and FactoryID = %s   """ % 
                        (Prod[0],   InvoiceNum, FactoryID ))
                    mydb.commit()
             
            print(InvoiceNum, 
              "Record inserted successfully") 
             
            mycursor.execute(
                "delete from InvoiceErrors where Invoice =  \'%s\' and Type = 'Order' and Error like   \'%s\'  " % (
                InvoiceNum, str(FactoryID)+"%" )) 
            mydb.commit()  
            mydb.close() 
                   
            Move_to_Prev(True,  str(InvoiceNum), invoice, FactoryName)
            
        else:
            
            print("Failed to insert Order // ",FactoryName, ' - ', str(InvoiceNum)  )
            try:
                mycursor.execute(
                    ("insert ignore into InvoiceErrors (Invoice, Type, Date, Error) " +  
                     "values (\'%s\', 'Order' , \'%s\' , \'%s\' )" + 
                     "on duplicate key update Error = \'%s\'") % (
                        InvoiceNum, InvoiceDate, 
                        str(FactoryID) + " // " + Errors,
                        str(FactoryID) + " // " + Errors))
                mydb.commit()
            except:
                mycursor.execute(
                    ("insert ignore into InvoiceErrors (Invoice, Type, Date, Error) " +  
                     "values (%s, 'Order' , \'%s\' , \'%s\' )" + 
                     "on duplicate key update Error = \'%s\'") % (
                        InvoiceNum, InvoiceDate, 
                        str(FactoryID) + " // " + Errors,
                        str(FactoryID) + " // " + Errors))
                mydb.commit()
                
            mydb.close() 
             
            Move_to_Prev(False, str(InvoiceNum), invoice, FactoryName)
################################### ERROR #####################################

    except Exception as e:  
        
        if InvoiceNum in locals():
            print("Failed to insert Order" )
            Error = e if Errors == [] else Errors 
            mycursor.execute(
                ("insert ignore into InvoiceErrors (Invoice, Type, Date, Error) " +  
                 "values (%s, 'Order', \'%s\' ,  \'%s\' )") % (
                    InvoiceNum, InvoiceDate,   " // " + Errors))
            
            mydb.commit()
            mydb.close() 
             
            Move_to_Prev(False, InvoiceNum, invoice, FactoryName)
        else:
            'Some Error'
            
        
    

os.chdir('C://Users//DamianEtchevest//Desktop//Irina//NaturaliStone Python Files')
        