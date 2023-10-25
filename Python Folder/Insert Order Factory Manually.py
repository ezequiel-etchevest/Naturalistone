
# %%% Setup 
 
from itertools import groupby
import PyPDF2 
import pdfplumber
import re 
from fractions import Fraction
import pandas as pd 
from datetime import datetime 
import requests   
import mysql.connector 
import os 
os.chdir('C://Users//DamianEtchevest//onedrive - naturalistone.com//Naturali')
import Predictive_Capacity_Freight as pp
from Modified_Document_Parser import move_file_with_rename, compare_file_text
from fuzzywuzzy import fuzz
 
mydb = mysql.connector.connect(
    host="naturalistone.cfbecwildn3j.us-east-1.rds.amazonaws.com",
    user = "admin",
    password="Ra7878782",
    database= "NaturaliStone",
    port = 3306)  
 
mycursor = mydb.cursor()

mycursor.execute("select max(TotalCost) TotalCost, " + 
                 "CompanyName from FreightInvoices FR " + 
         "right join Freight on Freight.FreightKey = FR.FreightKey " +
         "where CompanyName = 'GENERAL NOLI'" +
         "group by TotalCost " )
 
FreightCost = mycursor.fetchall()[0][0]
FreightCost = 12000
  
Errors = []
 
url = ('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol' + 
       '=EUR&to_symbol=USD&apikey=demo')
r = requests.get(url)
data = r.json()
today = data['Meta Data']['5. Last Refreshed'][:-9]
 
eurusd = float(
    data['Time Series FX (Daily)'][
    data['Meta Data']['5. Last Refreshed'][:-9]]['4. close'])   

ProdData = pd.DataFrame(columns= ['Type','ProdCode','Finish',
                        'Size','thickness','Quantity','Price'])
 
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
        os.remove( './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Invoices//' + 
                filesParsedInvoices[resultsParsedInvoices.index("Same")] + '.pdf')
        shutil.move(invoice, 
                  './/InvoicesReceived//Parsed Documents//Order Factory//' + FactoryName + '//Invoices//'  +
                  filesParsedInvoices[resultsParsedInvoices.index("Same")] + '.pdf') 
        print(f"{invoice} Same, replaced with new file in Successes")
        return True 
    else: 
        return False
    
    
# %%% DB Interactions. ProdName, Dimension, Products Functions. 
# %%%% ProdNameID. The following gets the prodNameID.

def ProdName(ProdCode , FactoryID, Material): 
    
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
def Dimension(Factory_Dimension, Finish, FactoryID):
    
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
                insert ignore into Dimension (Size, Thickness, Finish) 
                values (\'%s\' , \'%s\' ,\'%s\') ;""" %
                (Dimension, Thickness, Finish)) 
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
       
# %%%% Inserts 

def InsertIntoDB(Invoice, FactoryName, InvoiceNum, InvoiceValue,
                  InvoiceDate,proformasReferenced, ProdData):
        
    mycursor.execute("select FactoryID, Factory_Name from Factory " ) 
    FactoryID = mycursor.fetchall() 
    FactoryID = [Factory[0] for Factory in FactoryID 
                 if FactoryName == Factory[1]][0]
    
    for i in range(0,len(ProdData)):  
        
        Dimension(ProdData.iloc[i,2], ProdData.iloc[i,1], 
                  FactoryID) 
        ProdName(ProdData.iloc[i,0],FactoryID, ProdData.iloc[i,-1])
        
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
    
        DimensionID = Dimension(row['Size'], row['Finish'] , 
                                FactoryID) 
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
           
    Move_to_Prev(True,  str(InvoiceNum), Invoice, FactoryName)# %% 
    
    
# %% 
def produce_df(Material, Finish, Size, ProdName, ProdQuant, 
               Type, Thickness, TotalPrice,
               EURO_Flag, M2_Flag):
     
    ProdQuant = ProdQuant * 10.76 if M2_Flag == 'Y' and Type != 'Slab' else ProdQuant 
    Price = round(float(TotalPrice / ProdQuant),3)
    
    if EURO_Flag == 'Y':
        Price = round(float(Price * eurusd),3)
        Capacity = pp.predict_quantity(
           round(Thickness * .393700787 / 25,2) * 25, Type)
        ShippingCost = FreightCost / Capacity
        
        TotalCost = ShippingCost + Price
        
        SalePrice = round(ROI(Material, Type) * TotalCost,2) 
    else: 
        
        SalePrice = round(ROI(Material, Type) * Price,2)
         
    newdf = pd.DataFrame.from_dict({'ProdCode':[ProdName],
                                    'Finish': [Finish],
                                    'Size':[Size + 'x' + Thickness], 
                                    'Quantity': [ProdQuant],
                                    'Price':[Price], 
                                    'SalePrice':[SalePrice],
                                    'Material':[Material]}) 
     
    return newdf 

Invoice = '.\\InvoicesReceived\\Order Factory\\Inv_31867_from_Mosaic_Solutions__More_Inc_18588.PDF'
FactoryName = 'Mosaic Solutions & More Inc'
InvoiceNum = '31867'
InvoiceValue = 867.18
InvoiceDate =  datetime.strptime('4/14/2023', '%m/%d/%Y') 
proformasReferenced = None
ProdData =  produce_df('Limestone', 'Grove' ,'12x24',
              'Stream', 58.2, 'Tile', '3/4', 867.18,
              'N','N')
 
InsertIntoDB(Invoice, FactoryName, InvoiceNum, InvoiceValue,
             InvoiceDate,proformasReferenced, ProdData)

