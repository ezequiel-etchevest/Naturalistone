
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
import pandas as pd 
from datetime import datetime 
import requests  
import shutil
import mysql.connector 
import os 
os.chdir('C://Users//DamianEtchevest//onedrive - naturalistone.com//Naturali')

from Modified_Document_Parser import move_file_with_rename
from fuzzywuzzy import fuzz
 

def Move_to_Prev(Success, InvoiceNum, invoice):
    
    ######### Move any Previous Versions of Parsed Invoices in Invoice Naturali folder
    #########      to Mod Prev Version 
    filtered_ParsedInvoices = [ inv for inv in 
       os.listdir('.//InvoicesReceived//Parsed Documents//Order Factory//') 
       if InvoiceNum in inv]
    
    for inv in filtered_ParsedInvoices:
        move_file_with_rename(
            './/InvoicesReceived//Parsed Documents//Order Factory//' + inv, 
                inv.split('.pdf')[0],
            './/InvoicesReceived//Parsed Documents//Modifications (Prev Version) Factory Order//' )  
      
    ######### Move any error quotes to Mod Prev Version
    filtered_invoiceErrors =  [inv for inv in 
       os.listdir('.//InvoicesReceived//Parsed Documents//Errors//Order Factory Errors//') 
       if InvoiceNum in inv]
    
    for inv in filtered_invoiceErrors:
        move_file_with_rename(
            './/InvoicesReceived//Parsed Documents//Errors//Order Factory Errors//' + inv, 
                inv.split('.pdf')[0],
            './/InvoicesReceived//Parsed Documents//Modifications (Prev Version) Factory Order//' )   
         
    
    if Success:
        move_file_with_rename(invoice, InvoiceNum, 
          './/InvoicesReceived//Parsed Documents//Order Factory//') 
    else: 
        move_file_with_rename(invoice, InvoiceNum,
          './/InvoicesReceived//Parsed Documents//Errors//Order Factory Errors//')  
        
# %%% Find Prod Data
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
    mycursor.execute('select distinct(Factory_Dimension) from Factory_Dimensions' + 
                     ' where Factory_Dimension is not null')
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
        if Material == '': 
            Material_best_match, highest_probability = max(((Material, 
                            fuzz.token_set_ratio(line, Material)) 
                           for Material in Materials), key=lambda x: (x[1], len(x[0])))  
            
            if highest_probability < 80: 
                Errors.append('Material') 
                raise ValueError()   
    
    ############################ Finish    ########################################
    
        if any(finish in line for finish in Finishes):  
            Finish = [finish for finish in Finishes if finish in line ]
            
            if len(Finish)  != 1:
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
            Finish_best_match, highest_probability = max(((Finish, 
                            fuzz.token_set_ratio(line, Finish)) 
                           for Finish in Finishes), key=lambda x: (x[1], len(x[0])))
            
            if highest_probability < 80: 
                Errors.append('Finish') 
                raise ValueError() 
            else:
                Finish = Finish_best_match
             
         
    ############################ Dimension ########################################
        if any(Size in line.lower() for Size in AllSizes):  
            Size = [Size for Size in AllSizes if Size in line.lower() ][0]
        else:
            Errors.append('Size') 
            raise ValueError() 
         
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
        
        return Material, Finish, Size, ProdName, ProdNameID
        #print(Material, Finish, Size, ProdName, ProdNameID)
    except:
        return 'Error', Errors 
       #print(Errors)
       
# %%%  Parse Data Funtions. One for each factory.
# %%%% FondoValle Function


def FondoValle(InvoiceText):
    """ 
    This function parses Belotti invoices and returns a dataframe
    containing product information for each product in the Order. 
    """
     
#### Product Data 
    # If the order doesnt exist and its not custom then add products. 
    text = InvoiceText
    Prod_temp_df = pd.DataFrame(columns= [ 'Type','ProdCode','Finish',
                                'Size','thickness','Quantity','Price'])
    
    try:
        for group in [x for x in text.split('Descrizione'
                        )[1].split('\n') if 'NI8AB' in x and
                          "CRATE" not in x][:-1]:
            
            group = group.title() 
            Prodline = list(filter(lambda x: x != '', group.split(' ')))
            
            #Get all avaiable Finsishes
            mycursor.execute('select distinct(Finish) from Dimension')
            Finishes = [Finish[0] for Finish in mycursor.fetchall() ] 
            Finishes.append('Matte')
             
            if any(finish in group for finish in Finishes): 
                Finish = [finish for finish in Finishes
                          if finish in group][0]
                if Finish == 'Matte':
                    Finish = 'Honed'
              #  FinishIndex = LineSplit.index(Finish)
            else:
                Finish = None   
                 
            size = re.findall('[0-9]+X[0-9]+', group)[0].replace('x','X')
            
            Name = ' '.join(Prodline[Prodline.index(size.replace('x','X')) + 1:
                                     Prodline.index(Finish)])  
             
            thickness = Prodline[Prodline.index(Finish)+2].replace(',','.')
            
            if any(Type in group for Type in ['Tile','Slab']): 
                Type = [Type in group for Type in ['Tile','Slab']
                          if Type in group][0]
            else:
                Type = None   
                
            ProdQuant = Prodline[-3].replace(',','.')

            # Invoice Currency already in USD
            Price = round(float(Prodline[-2].replace(',','.')),3) 
            
            newdf = pd.DataFrame.from_dict({'Type':[Type],
                                            'ProdCode':[Name], 
                                            'Finish': [Finish],
                                            'Size':[size],
                                            'thickness': [thickness],
                                            'Quantity': [ProdQuant],
                                            'Price':[Price]})
            
            Prod_temp_df = Prod_temp_df.append(newdf)
            
    except:
        global Errors
        Errors.append(Name)
        pass
            
    return Prod_temp_df
    
# %%%% Ricchetti Function


def Ricchetti(InvoiceText):
    """ 
    This function parses Belotti invoices and returns a dataframe
    containing product information for each product in the Order. 
    """
     
#### Product Data 
    # If the order doesnt exist and its not custom then add products. 
    text = InvoiceText
    Prod_temp_df = pd.DataFrame(columns= [ 'Type','ProdCode','Finish',
                                'Size','thickness','Quantity','Price'])
    
    try:
        for group in [x for x in text.split('Descrizione - Description')[1].split(
                    'OPERAZIONE')[0].split('\n') if 'N8A' in x] :
            
            group = group.title() 
            Prodline = list(filter(lambda x: x != '', group.split(' ')))
            
            #Get all avaiable Finsishes
            mycursor.execute('select distinct(Finish) from Dimension')
            Finishes = [Finish[0] for Finish in mycursor.fetchall() ] 
            Finishes.append('Matte')
             
            if any(finish in group for finish in Finishes): 
                Finish = [finish for finish in Finishes
                          if finish in group][0]
                if Finish == 'Matte':
                    Finish = 'Honed'
              #  FinishIndex = LineSplit.index(Finish)
            else:
                Finish = None   
                
            Name = ' '.join(Prodline[2:4])  
            
            size = re.findall('[0-9]+x[0-9]+', group.replace('X','x'))[0]
            
            thickness = Prodline[Prodline.index('Mq')-1] 
            
            if any(Type in group for Type in ['Tile','Slab']): 
                Type = [Type in group for Type in ['Tile','Slab']
                          if Type in group][0]
            else:
                Type = None   
                
            ProdQuant = Prodline[Prodline.index('N8A')-3]                    
            Price = round(float(Prodline[Prodline.index('N8A')-2].replace(',','.'))
                          * eurusd,3) 
            
            newdf = pd.DataFrame.from_dict({'Type':[Type],
                                            'ProdCode':[Name], 
                                            'Finish': [Finish],
                                            'Size':[size],
                                            'thickness': [thickness],
                                            'Quantity': [ProdQuant],
                                            'Price':[Price]})
            
            Prod_temp_df = Prod_temp_df.append(newdf)
            
    except:
        global Errors
        Errors.append(Name)
        pass
            
    return Prod_temp_df
    
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
    
    try:
        for group in text.split('DESCRIZIONE / DESCRIPTION')[1].split(
                'HS code')[0].split('Color')[1:]:
            
            originalGroup = group
            if 'PACKING' in originalGroup.split('\n')[1]:
                continue
            
            group = group.title()
            
           
            Results = FindProd(group, FactoryID, 'Terrazzo')
            if 'Error' in Results:
                Error = Results[1]
                raise ValueError()   
            else:
                Material, Finish, Size, ProdName, ProdNameID = Results
           
            Prodline = group.split('\n')[1].split(' ')
            pckgTotal = (float(group.split('\n')[2].split(
                ' ')[-2].replace('.','').replace(',','.')) 
                if  "PACKING" in originalGroup.split('\n')[2] else 0)
            ProdTotal = float(Prodline[-2].replace('.','').replace(',','.'))
             
            if 'Tile' in group.split('\n')[1]: 
                ProdQuant = int(float(Prodline[-4].replace(
                    '.','').replace(',','.')) * 10.76 )
                
            elif 'Slab' in group.split('\n')[1]: 
                try:
                    ProdQuant = int(re.findall('[0-9]+',group.split(
                        '\n')[1].split('N.')[1])[0])
                except:  
                    ProdQuant = int(Prodline[Prodline.index([piece
                            for piece in ['Pcs','Pieces'] 
                        if piece in group.split( '\n')[1]][0])-1]) 
                 
            Price = round((pckgTotal + ProdTotal) / ProdQuant * eurusd,3) 
            
            newdf = pd.DataFrame.from_dict({'ProdCode':[ProdName], 
                                            'Finish': [Finish],
                                            'Size':[Size], 
                                            'Quantity': [ProdQuant],
                                            'Price':[Price]})
            
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
        
    Prod_temp_df = pd.DataFrame(columns= ['Type','ProdCode','Finish',
                            'Size','thickness','Quantity', 'Price'])
    
    for group in text.split(' *** PROFORMA INVOICE ***')[1].split(
            'Bank')[0].split('AGGLO')[1:]:
    
        Name = 'Agglo' + ' '.join(group.split("\n")[0].split(' ')[:-1]
                                  ).title().rstrip().strip() 
        Finish = group.split("\n")[0].split(' ')[-1].title() 
                    
        for line in group.split("\n"):
            LineSplit = line.split(" ")
            
            if 'Tiles' in line:
                Type = 'Tiles'
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
                
            elif 'Slabs' in line:
                Type = 'Slabs'
                total = float(LineSplit[-1].replace('.','').replace(',','.'))                     
                Price = round(total  * eurusd / int(re.findall(
                    '[0-9]+',group.split(line)[1].split('N.')[1])[0]) ,2) 
                
                size = 'x'.join(re.findall('[0-9]+',group.split(
                    line)[1].split('N.')[1])[1:])
                
                thickness = re.findall('[0-9]+',group.split(
                    line)[1].split('N.')[1])[-1]
                
                ProdQuant = re.findall('[0-9]+',group.split(
                    line)[1].split('N.')[1])[0]
                
                size = 'x'.join(size.split('x')[:-1])
           
            if 'Tiles' in line or 'Slabs' in line:
                newdf = pd.DataFrame.from_dict({'Type':[Type],
                                                'ProdCode':[Name],
                                                'Finish': [Finish],
                                                'Size':[size],
                                                'thickness' : [thickness],
                                                'Quantity': [ProdQuant],
                                                'Price':[Price] })
                
                Prod_temp_df = Prod_temp_df.append(newdf)
    
    return Prod_temp_df
            
                    
# %%% DB Interactions. ProdName, Dimension, Products Functions. 
# %%%% ProdNameID. The following gets the prodNameID.

def ProdName(ProdCode , FactoryID): 
    
    # PRODNAME ID 
    mycursor.execute(
         """ select ProdNameID from ProdNames 
         where Factory_ProdName = \'%s\' """
         % (str(ProdCode)))
    ProdNameID = mycursor.fetchall()
    
    if ProdNameID == [] and 'Agglo' in ProdCode: 
        # PRODNAME ID 
        mycursor.execute(
             """ select ProdNameID from ProdNames 
             where Factory_ProdName = \'%s\' """
             % (str(ProdCode).split(' ')[1:]))
        ProdNameID = mycursor.fetchall()
            
    if ProdNameID != []:
        ProdNameID = ProdNameID[0][0]
        return  ProdNameID  
    else: 
        mycursor.execute("""
             insert into ProdNames (FactoryID, Factory_ProdName) 
             values (%s, \'%s\') ;""" %
             (FactoryID, str(ProdCode))) 
    
        mydb.commit()
        print("New FactoryName", str(ProdCode), FactoryID)
        Errors.append('FactoryName ')  
        return
    
    

# %%%% DimensionID. The following gets the DimensionID.
def Dimension(Factory_Dimension, Finish, FactoryID, MaterialType ):
    
    # DIMENSION ID
 
    mycursor.execute(
         """ select Naturali_Dimension from Factory_Dimensions 
         where Factory_Dimension = \'%s\' and FactoryID = \'%s\'  """
         % (Factory_Dimension.replace('.0',''),FactoryID))
    Naturali_Dimension = mycursor.fetchall()
    

    if Naturali_Dimension != []:
        if Naturali_Dimension[0][0] == None:
            print("No Naturali Dimension")
            Errors.append("No Naturali Dimension")   
            return
        
        Dimension = 'x'.join(Naturali_Dimension[0][0].split('x')[:-1])
        Thickness = Naturali_Dimension[0][0].split('x')[-1] 
        mycursor.execute(
             """ select DimensionID from Dimension
             where Size = \'%s\' and Thickness = \'%s\' 
             and Finish = \'%s\' and Material = \'%s\' """
             % (Dimension,Thickness, Finish, MaterialType))
        DimensionID = mycursor.fetchall()[0]
        return DimensionID[0] 
    else :  
        mycursor.execute("""
                 insert ignore into Factory_Dimensions (FactoryID, Factory_Dimension) 
                 values (%s, \'%s\') ;""" %
                 (FactoryID, Factory_Dimension)) 
        
        mydb.commit()
        print("New Dimension", Factory_Dimension, FactoryID)
        Errors.append('Dimension ' )   
        return  
                    

 
    
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
            
        mycursor.execute("select FactoryID, Factory_Name from Factory " ) 
        FactoryID = mycursor.fetchall() 
################################# ORDER DATA ##################################
 
        if all(s in text for s in ['1101379', 'PROFORMA INVOICE' ]):  
            
            InvoiceDate =  datetime.strptime(
                re.findall('[0-9]+/[0-9]+/[0-9]+', text)[0], '%d/%m/%Y')
            InvoiceNum = re.findall('[0-9]+',text.split('Page')[1])[0]
            InvoiceValue = re.findall('[0-9]+',text.split(
                'Total Invoice')[1].split("\n")[1].replace('.',''))[0] 
            
            Material = 'Terrazzo'
            FactoryName = 'MarmiScala'
            FactoryID = [Factory[0] for Factory in FactoryID 
                         if FactoryName == Factory[1]][0]
            ProdData = Marmi(text) 
            
        elif all(s in text for s in ['info@belottitiles.com',
                        'Proforma Invoice', 'DATA / DATE']):  
                    
        #### Order Primary Data  
            InvoiceDate = datetime.strptime(
                re.findall('[0-9]+/[0-9]+/[0-9]+', text)[0], '%d/%m/%Y')
            InvoiceNum =  text.split(re.findall(
                  '[0-9]+/[0-9]+/[0-9]+', text)[0])[0].split('\n')[-1].rstrip(
                      ).replace('REV','').replace('/0','/')
            if text.split('Italy')[1].split('\n')[1].title() != 'Proforma Invoice':
                shutil.move(invoice,
                    './/InvoicesReceived//Parsed Documents//Order Factory//Invoice//' 
                    + InvoiceNum + '.pdf')
                return print("Moved to Factory Invoice" ) 
                    
            InvoiceValue = re.findall('[0-9]+',text.split(
                'TOTALE FATTURA')[-1].split("\n")[1].replace('.',''))[0] 
            OrderBy = list(filter(lambda x: ('@' in x) & ('belotti' not in x), 
                                  text.split(' ')))[0].split('\n')[0]  
            Material = 'Terrazzo'
            FactoryName = 'Belotti'
            FactoryID = [Factory[0] for Factory in FactoryID 
                         if FactoryName == Factory[1]][0]
            ProdData, Status = Belotti(text, FactoryID)
            
             
        # elif (all(s in text for s in ['Ricchetti', 'INVOICE','Description' ]) or
        #       all(s in text for s in ['Ricchetti', 'PROFORMA','Description' ])):
                
        #     InvoiceDate =  datetime.strptime(
        #         re.findall('[0-9]+/[0-9]+/[0-9]+', text.split(
        #             'Documento-Document-Beleg')[1].split('\n')[1])[0],
        #         '%d/%m/%y') 
        #     InvoiceNum = re.findall('[0-9]+',text.split(
        #         'Documento-Document-Beleg')[1].split('\n')[1])[0]
        #     InvoiceValue = float(text.split('Tot.Inv.')[1].split("\n"
        #                          )[0].replace('.','').replace(',','.').strip())
        #     ProdData = Ricchetti(text) 
        #     Material = None
        #     Factory = 'Ricchetti'
            
        
        elif (all(s in text for s in ['FONDOVALLE','Proforma Invoice', 'Codice']) or
              all(s in text for s in ['Fondovalle','Proforma Invoice', 'Codice'])):
                 print(invoice)
                 return
        #        InvoiceDate =  datetime.strptime(re.findall('[0-9]+.[0-9]+.[0-9]+',
        #                        text.split('Date')[1])[0].replace('.','/'), '%d/%m/%Y') 
        #        InvoiceNum =  (text.split('Proforma Invoice No.')[1].split('\n')[0]
        #                       ).strip().split(' ')[0]
               
        #        InvoiceValue = float(text.split('Totale IVA')[1].split(
        #            'Total Amount')[1].split("\n")[0].replace('.','').replace(',','.').strip())
        #        ProdData = FondoValle(text) 
        #        Material = None
        #        Factory = 'Fondovalle'     
        
        else:
            #print('Logic not ready for this factory.') 
            return

        
################################## PROD DATA ##################################

        if 'Failed' != Status:
            for i in range(0,len(ProdData)):  
                
                Dimension(ProdData.iloc[i,2], ProdData.iloc[i,1], 
                          FactoryID, Material) 
                ProdName(ProdData.iloc[i,0],FactoryID)
            
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
            
            ProdIDs_Current_Order = []
            for index, row in ProdData.iterrows(): 
            
                DimensionID = Dimension(row['Size'], row['Finish'] , 
                                        FactoryID, Material) 
                ProdNameID = ProdName(row['ProdCode'],FactoryID)
                
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
                 
                # PRODORDERED ID
                mycursor.execute(
                    ("select OrderID from ProdOrdered where " + 
                    "OrderID = \'%s\' and ProdID = %s") % 
                    (InvoiceNum , ProdID))
                ProdOrderID = mycursor.fetchall()
                
                if ProdOrderID == []:  
                    mycursor.execute(
                        ("insert ignore into ProdOrdered (OrderID, ProdID, " +
                         "Quantity, PurchasePrice) values (\'%s\', %s, %s, %s)")
                        % (InvoiceNum, ProdID, row['Quantity'], row['Price']))
                    mydb.commit()    
                else: 
                    sql = """ update ProdOrdered 
                        set Quantity = %s, PurchasePrice = %s, Status = 'Incoming' 
                        where OrderID = %s and ProdID = %s """
                    val = [row['Quantity'] , row['Price'], InvoiceNum ,ProdID]            
                    mycursor.execute(sql, val )
                    mydb.commit()
                 
                ProdIDs_Current_Order.append(ProdID)
                    
             # PRODORDERED ID
            mycursor.execute(
                 ("select ProdID from ProdOrdered where OrderID = \'%s\'  ") % 
                 (InvoiceNum  ))
            ProdOrdered = mycursor.fetchall()
            
            for Prod in ProdOrdered:
                if Prod[0] not in ProdIDs_Current_Order: 
                    # Set Status = Canceled for each product not in the new list of prods.
                    mycursor.execute(
                        """update ProdOrdered set ProdOrdered.Status = 'Canceled'
                        where ProdID = %s and OrderID =  \'%s\' """ % 
                        (Prod[0],   InvoiceNum))
                    mydb.commit()
             
            move_file_with_rename(invoice, InvoiceNum.replace('/','.'),
                 './/InvoicesReceived//Parsed Documents//Order Factory//') 
             
            print(InvoiceNum, 
              "Record inserted successfully") 
             
            mycursor.execute(
                "delete from InvoiceErrors where Invoice =  \'%s\' " % (InvoiceNum))
            mydb.commit()  
            mydb.close() 
                   
            Move_to_Prev(True, InvoiceNum.replace('/','.'), invoice)
            
        else:
            if Errors == []:
                Errors = ProdData
            print("Failed to insert Order" )
            try:
                mycursor.execute(
                    ("insert ignore into InvoiceErrors (Invoice, Type, Date, Error) " +  
                     "values (\'%s\', 'Order' , \'%s\' , \'%s\' )" + 
                     "on duplicate key update Error = \'%s\'") % (
                        InvoiceNum, InvoiceDate, 
                        str(FactoryID) + " // " + ' // '.join(Errors),
                        str(FactoryID) + " // " + ' // '.join(Errors)))
                mydb.commit()
            except:
                mycursor.execute(
                    ("insert ignore into InvoiceErrors (Invoice, Type, Date, Error) " +  
                     "values (%s, 'Order' , \'%s\' , \'%s\' )" + 
                     "on duplicate key update Error = \'%s\'") % (
                        InvoiceNum, InvoiceDate, 
                        str(FactoryID) + " // " + ' // '.join(Errors),
                        str(FactoryID) + " // " + ' // '.join(Errors)))
                mydb.commit()
                
            mydb.close() 
             
            Move_to_Prev(False, InvoiceNum.replace('/','.'), invoice)
################################### ERROR #####################################

    except Exception as e:  
        
        print("Failed to insert Order" )
        Error = e if Errors == [] else Errors 
        mycursor.execute(
            ("insert ignore into InvoiceErrors (Invoice, Type, Date, Error) " +  
             "values (%s, 'Order', \'%s\' ,  \'%s\' )") % (
                InvoiceNum, InvoiceDate,  '// '.join(Error)))
        
        mydb.commit()
        mydb.close() 
         
        move_file_with_rename(invoice, InvoiceNum.replace('/','.'),
             './/InvoicesReceived//Parsed Documents//Errors//Order Factory Errors//') 
        
    
    
                    
        