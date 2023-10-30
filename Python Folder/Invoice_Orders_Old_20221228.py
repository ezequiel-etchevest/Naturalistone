
# %%% Setup 

import pdfplumber
import re 
import pandas as pd 
from datetime import datetime 
import requests  
import shutil
import mysql.connector 
 

# %%%  Parse Data Funtions. One for each factory.
# %%%% Belotti Function

def Belotti(InvoiceText):
    """ 
    This function parses Belotti invoices and returns a dataframe. 
    """
    
    Belotti = pd.read_excel(
        'Terrazzo Bellotti- Marmi Scala Names 2022.xlsx',
        sheet_name = 0)
    
    Belotti = Belotti.iloc[:,:2].append(
        Belotti.iloc[:,2:].rename(columns = {
            Belotti.columns[2] : Belotti.columns[0] ,
            Belotti.columns[3] : Belotti.columns[1]})) 
    
    for x in Belotti.columns: 
        Belotti[x] = Belotti[x].astype(str).str.rstrip().str.title() 
    
#### Order Primary Data 
    text = InvoiceText
    InvoiceDate = datetime.strptime(
        re.findall('[0-9]+/[0-9]+/[0-9]+', text)[0], '%d/%m/%Y')
    InvoiceNum =  text.split(re.findall(
         '[0-9]+/[0-9]+/[0-9]+', text)[0])[0].split('\n')[-1].rstrip()
    InvoiceValue = re.findall('[0-9]+',text.split(
        'TOTALE FATTURA')[-1].split("\n")[1].replace('.',''))[0] 
    OrderBy = list(filter(lambda x: ('@' in x) & ('belotti' not in x), 
                          text.split(' ')))[0].split('\n')[0] 
    
    #EstDeliveryDate = '' 
    #FreightID = ''
    
    mycursor.execute("select FactoryID from Factory where " + 
                     "Factory_Name = 'Belotti'")
    FactoryID = mycursor.fetchall()[0][0] 
    
    # If the order already exists then dont add it again. 
    sql = ("REPLACE into Orders (OrderID, Value, InvoiceDate, " + 
           " Order_By, FactoryID ) values (%s, %s, %s, %s, " +
           "(select FactoryID from Factory where Factory_Name = 'Belotti'))")
    mycursor.execute(sql, (InvoiceNum, InvoiceValue, InvoiceDate,  OrderBy))
    mydb.commit()
        
#### Product Data 
    # If the order doesnt exist and its not custom then add products. 
    if not re.findall('AS PER SAMPLE',text): #Order == [] :
        
        df = pd.DataFrame(columns= ['Fabricator','Type','ProdCode',
                                    'Prod','Finish','Size','thickness',
                                    'Quantity','Price',
                                    'InvoiceNum','InvoiceDate'])
        for group in text.split('Color : ')[1:]:
            prod = ' '.join(group.split(
                "\n")[0].split(' ')[:-1]).replace(
                    'surface','').title().rstrip()
            Finish = group.split("\n")[0].split(' ')[-1].title()
            
            Prodline = group.split('\n')[1].split(' ')
            pckgTotal = float(group.split('\n')[2].split(
                ' ')[-2].replace('.','').replace(',','.'))
            ProdTotal = float(Prodline[-2].replace('.','').replace(',','.'))
            Dimensions = list(filter(
                lambda x: re.findall('[0-9]+x[0-9]+', group.split(
                    '\n')[1])[0] in x,
                Prodline))[0]
            thickness = Dimensions.split('x')[-1]
            size = re.findall('[0-9]+x[0-9]+',Dimensions)[0]
            
            if 'Tile' in group.split('\n')[1]:
                Type = 'Tiles'
                # Convert Square meter to square feet. 
                ProdQuant = float(Prodline[-4].replace(
                    '.','').replace(',','.')) * 10.76
                
            elif 'Slab' in group.split('\n')[1]:
                Type = 'Slabs'
                ProdQuant = int(re.findall('[0-9]+',group.split(
                    '\n')[1].split('n.')[1])[0])
             
            Price = round((pckgTotal + ProdTotal) / ProdQuant * eurusd,3)
            
            NaturaliName = '' 
            
            for i in range(0,len(Belotti)):  
                if prod.split(' ')[0] in str(Belotti.iloc[i,0]): 
                    NaturaliName = Belotti.iloc[i,1].title().rstrip()
            if NaturaliName == '':
                mycursor.execute(
                    ("insert ignore into InvoiceErrors (Invoice, Type, Date, Error) " +  
                     "values (%s, \'%s\' ,  \'%s\' )") % (
                        InvoiceNum, 'Order' , InvoiceDate, 'NaturaliName not Found'))
                
                mydb.commit()
            
            newdf = pd.DataFrame.from_dict({'Fabricator' : 'Belotti',
                                                   'Type':[Type],
                                                   'ProdCode':[prod],
                                                   'Prod': [NaturaliName],
                                                   'Finish': [Finish],
                                                   'Size':[size],
                                                   'thickness' : [thickness],
                                                   'Quantity': [ProdQuant],
                                                   'Price':[Price],
                                                   'InvoiceNum': [InvoiceNum],
                                                   'InvoiceDate':[InvoiceDate]})
            df = df.append(newdf)
        return df
    
# %%%% Marmi Scala Function

def Marmi(InvoiceText):
    """ 
    This function parses Marmi Scale invoices and returns a dataframe. 
    """
    

    MarmiScala = pd.read_excel(
        'Terrazzo Bellotti- Marmi Scala Names 2022.xlsx',
        sheet_name = 1) 
    
    MarmiScala = MarmiScala.iloc[:,:2].append(
        MarmiScala.iloc[:,2:].rename(columns = {
            MarmiScala.columns[2] : MarmiScala.columns[0] ,
            MarmiScala.columns[3] : MarmiScala.columns[1]})) 
    
    for x in MarmiScala.columns: 
        MarmiScala[x] = MarmiScala[x].astype(str).str.rstrip().str.title() 
    
##### Order Data

    text = InvoiceText
    InvoiceDate =  datetime.strptime(
        re.findall('[0-9]+/[0-9]+/[0-9]+', text)[0], '%d/%m/%Y')
    InvoiceNum = re.findall('[0-9]+',text.split('Page')[1])[0]
    InvoiceValue = re.findall('[0-9]+',text.split(
        'Total Invoice')[1].split("\n")[1].replace('.',''))[0]
    Payment = '' 
    # Can use the email where it came from.
    OrderBy = ''
    EstDeliveryDate = '' 
    FreightID = ''
     
    mycursor.execute("select FactoryID from Factory where " + 
                     "Factory_Name = 'Marmi'")
    FactoryID = mycursor.fetchall()[0][0]

    # Fetch Order from Order table. 
    mycursor.execute(("select * from Orders where DocumentNumber = \'%s\' " + 
                     "and FactoryID = %s " ) % (InvoiceNum, FactoryID))
    Order = mycursor.fetchall() 
    
    # If the order already exists then dont add it again.
    if Order == []:
        sql = ("insert into Orders (Value, FactoryID, InvoiceDate, " + 
               "EstDeliveryDate, DocumentNumber, Payment, FreightID, " + 
               "Order_By ) values (%s, %s, %s, %s, %s, %s, %s, %s)")
        mycursor.execute(sql, (InvoiceValue, FactoryID, InvoiceDate, 
                               EstDeliveryDate, InvoiceNum, Payment,
                               FreightID, OrderBy))
        mydb.commit()
        
##### Product Data
    
    
    df = pd.DataFrame(columns= ['Fabricator','Type','ProdCode','Prod','Finish',
                            'Size','thickness','Quantity',
                            'Price','InvoiceNum','InvoiceDate'])
    for group in text.split(' *** PROFORMA INVOICE ***')[1].split(
            'Bank')[0].split('AGGLO')[1:]:
    
        prod = ' '.join(group.split("\n")[0].split(' ')[1:-1])
        Finish = group.split("\n")[0].split(' ')[-1].title()
        NaturaliName = ''                     
        
        for i in range(0,len(MarmiScala)): 
                if prod in str(MarmiScala.iloc[i,0]).upper() : 
                    NaturaliName = MarmiScala.iloc[i,1].title().rstrip()
                    
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
                newdf = pd.DataFrame.from_dict({'Fabricator' : 'Marmi',
                                                       'Type':[Type],
                                                       'ProdCode':[prod],
                                                       'Prod': [NaturaliName],
                                                       'Finish': [Finish],
                                                       'Size':[size],
                                                       'thickness' : [thickness],
                                                       'Quantity': [ProdQuant],
                                                       'Price':[Price],
                                                       'InvoiceNum': [InvoiceNum],
                                                       'InvoiceDate':[InvoiceDate]})
                
                df = df.append(newdf)
    return df
            
                    
# %%% DB Interactions. ProdName, Dimension, Products Functions. 
# %%%% ProdNameID. The following gets the prodNameID.
def ProdName(ProdCode: str, NaturaliProdName: str, Factory: str):
    
    mycursor.execute(
        ("select FactoryID from Factory where Factory_Name = \'%s\'") % (Factory))
    FactoryID = mycursor.fetchall()[0][0]
    # Fetch ProdNameID from ProdNames table 
    mycursor.execute("select ProdNameID from ProdNames where " + 
                     "Factory_ProdName = \'%s\'" % (ProdCode))
    ProdNameID = mycursor.fetchall()
    
    if len(ProdNameID) > 1: 
        print('Product: ', ProdCode, ' has multiple values.', 
              'Getting the first one. ')
        ProdNameID = ProdNameID[0]
        
    # if we dont find any prod code then it means that we need to 
    # create one. Check if list is empty, 
    # if so then use the following sql query. 
    if ProdNameID == []: 
          # Insert Product Name if it doesnt exist
          mycursor.execute(
              ("insert into ProdNames (Naturali_ProdName, " + 
                 "Factory_ProdName, FactoryID) values (\'%s\',"+
                 "\'%s\', \'%s\')") % (NaturaliProdName, ProdCode, FactoryID))
          mydb.commit()
          # Fetch ProdNameID recently inserted. 
          mycursor.execute(
              ("select ProdNameID from ProdNames where " +
               "Factory_ProdName = \'%s\' ") % (ProdCode))
          ProdNameID = mycursor.fetchall()
    
    return  ProdNameID[0]     

# %%%% DimensionID. The following gets the DimensionID.
def Dimension(Size: str, Thickness: str, Finish: str, Type: str):
    # Fetch DimensionID from Dimension table 
    mycursor.execute(
        ("select DimensionID from Dimension where Size = \'%s\' " + 
        "and Thickness = \'%s\' and Finish = \'%s\' " +
        "and Type = \'%s\'") % (Size, Thickness, Finish, Type))
    ID = mycursor.fetchall()
    
    if len(ID) > 1: 
        print('Dimensions: ', Size, Thickness, Finish, Type,
              ' have multiple values. Getting the first one ')
        ID = ID
        
    if ID == []: 
         # Insert Product Name if it doesnt exist
         mycursor.execute(
             ("insert into Dimension (Size, Thickness, Type, " + 
              "Finish) values (\'%s\', \'%s\', \'%s\', \'%s\')") 
              % (Size, Thickness, Type, Finish))
         mydb.commit()
         mycursor.execute(
             ("select DimensionID from Dimension where " + 
              "Size = \'%s\' and Thickness = \'%s\' and" + 
              " Finish = \'%s\' and Type = \'%s\'") 
             % (Size, Thickness, Finish, Type))
         ID = mycursor.fetchall()
         
    return ID[0]              

# %%%% Insert Prod in Products Table if last updated date < order date.
def Products(InvoiceData_df):

#### Get Relative IDS
    mycursor.execute(("select FactoryID from Factory where " + 
                     "Factory_Name = \'%s\' ") % 
                     (InvoiceData_df['Fabricator'])) 
    FactoryID = mycursor.fetchall()[0][0]
    
    # Fetch Order from Order table. 
    mycursor.execute(("select OrderID from Orders where DocumentNumber = \'%s\' " + 
                     "and FactoryID = %s " ) % (InvoiceData_df['InvoiceNum'],
                                                FactoryID))
    OrderID = mycursor.fetchall()[0][0]
    
    DimensionID = Dimension(InvoiceData_df[5],InvoiceData_df[6],
                            InvoiceData_df[4],InvoiceData_df[1])[0]
    
    ProdNameID = ProdName(InvoiceData_df[2],InvoiceData_df[3],
                          InvoiceData_df[0])[0]
    # Fetch ProdID from Products table 
    mycursor.execute(
        ("select ProdID, Value, Updated_Date from Products " + 
         "where DimensionID = %s and ProdNameID = %s") 
        % (DimensionID, ProdNameID))

#### Get or insert ProdID, which we need to update ProdOrdered & Inventory.
    try: 
        ProdID, Value, Updated_Date = zip(*mycursor.fetchall()[0])
        if ProdID != []: 
            print('Product:', DimensionID, ProdNameID,
                  'already exits, last updated on:', Updated_Date)
            if Updated_Date[0] < InvoiceData_df[-1].date():
                mycursor.execute(
                    ("Update Products set " + 
                     "Value = %s, Updated_Date = \'%s\' " + 
                     "where ProdID = %s")
                    % (InvoiceData_df[8], InvoiceData_df[-1], ProdID[0]))
                mydb.commit()
    except:
        # insert product 
        mycursor.execute(
            ("insert into Products (ProdNameID, DimensionID, " +
             "Value, Updated_Date) values (%s, %s, %s, \'%s\')")
            % (ProdNameID, DimensionID, InvoiceData_df[8],InvoiceData_df[-1]))
        mydb.commit()
        
        mycursor.execute(
            ("select ProdID from Products " + 
             "where DimensionID = %s and ProdNameID = %s") 
            % (DimensionID, ProdNameID))
        ProdID = mycursor.fetchall()[0]
   
##### Update ProdOrdered.
    # Checking if the product was already inserted in the ProdOrdered table. 
    mycursor.execute(
        ("select OrderID, ProdID from ProdOrdered " + 
         "where OrderID = %s and ProdID = %s") % (OrderID, ProdID[0]))
    # If it hasnt, then insert. Else do nothing. 
    if mycursor.fetchall() == []: 
        
        mycursor.execute(
            ("insert into ProdOrdered (OrderID, ProdID, " +
             "Quantity) values (%s, %s, %s)")
            % (OrderID, ProdID[0], InvoiceData_df['Quantity']))
        mydb.commit()    
##### Update Inventory.  

'''
    # Checking if the product was already inserted in the Inventory table. 
    mycursor.execute(
        ("select * from Inventory where ProdID = %s") % ( ProdID))
    try:
        ProdID, Stock, InTransit, Updated_Date = zip(*mycursor.fetchall())
        if Updated_Date[0] < InvoiceData_df[-1].date():
            mycursor.execute(
                ("Update Inventory" +
                 "set CurrentlyAvailable = %s " +
                 "set Updated_Date = %s" + 
                 "where ProdID = %s")
                % (Stock[0] + InvoiceData_df['Quantity'] ,
                   InvoiceData_df['InvoiceDate'], 
                   ProdID))
        
            mydb.commit()
    except:
        # If it hasnt, then insert. Else do nothing.  
        mycursor.execute(
            ("insert into Inventory (ProdID, CurrentlyAvailable, " +
             "Updated_Date) values (%s, %s, \'%s\' )")
            % (ProdID[0], 
               InvoiceData_df['Quantity'],
               InvoiceData_df['InvoiceDate']))
        
        mydb.commit()
''' 
    
# %%% Get Invoices. For loop for invoices in folder. 
 

def Parse_Factory_Invoice(invoice):
    try:
        global mydb
        mydb = mysql.connector.connect(
            host="database-1.cfbecwildn3j.us-east-1.rds.amazonaws.com",
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
          
        
        url = ('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol' + 
               '=EUR&to_symbol=USD&apikey=demo')
        r = requests.get(url)
        data = r.json()
        today = data['Meta Data']['5. Last Refreshed'][:-9]
        
        global eurusd
        eurusd = float(
            data['Time Series FX (Daily)'][
            data['Meta Data']['5. Last Refreshed'][:-9]]['4. close'])   
        
        df = pd.DataFrame(columns= ['Fabricator','Type','ProdCode','Prod','Finish',
                                'Size','thickness','Quantity',
                                'Price','InvoiceNum','InvoiceDate'])
        
        with pdfplumber.open(invoice) as pdf: 
            pages = pdf.pages 
            page =  pdf.pages[0]
            text = pdf.pages[0].extract_text() if len(pages) > 2 else '\n'.join(
                [x.extract_text() for x in pages])
         
        if len(pages) > 2: 
            
            if 'info@belottitiles.com' in text:  
                InvoiceDate = datetime.strptime(
                    re.findall('[0-9]+/[0-9]+/[0-9]+', text)[0], '%d/%m/%Y')
                InvoiceNum = text.split(re.findall(
                    '[0-9]+/[0-9]+/[0-9]+', text)[0])[0].split('\n')[-1].rstrip()
                
            elif '1101379' in text:  
                InvoiceDate =  datetime.strptime(
                    re.findall('[0-9]+/[0-9]+/[0-9]+', text)[0], '%d/%m/%Y')
                InvoiceNum = re.findall('[0-9]+',text.split('Page')[1])[0]
                
            mycursor.execute(
                ("insert ignore into InvoiceErrors (Invoice, Type, Date, Error) " +  
                 "values (%s, \'%s\' ,  \'%s\' )") % (
                    InvoiceNum, 'Order' , InvoiceDate, 'Multiple Pages'))
            mydb.commit()
            
            shutil.move(invoice, 
                      './/InvoicesReceived//Parsed Documents//Errors//' +
                      InvoiceNum + '.pdf') 
            
        else: 
            
            if 'info@belottitiles.com' in text: 
                df = df.append(Belotti(text)) 
                
            elif '1101379' in text: 
                df = df.append(Marmi(text))
              
            df = df.sort_values('InvoiceDate')
    
            for i in range(0,len(df)): 
                Products(df.iloc[i,:]) 
                 
            mydb.close()
         
             
            shutil.move(invoice, 
                      './/InvoicesReceived//Parsed Documents//Order Factory//' +
                      InvoiceNum + '.pdf' ) 
    
    except Exception as e:  
        try:
            mycursor.execute(
                ("insert ignore into InvoiceErrors (Invoice, Type, Date, Error) " +  
                 "values (%s, \'%s\' ,  \'%s\' )") % (
                    InvoiceNum, 'Order' , InvoiceDate, e))
            
            mydb.commit()
            mydb.close()
        except:
            mycursor.execute(
                ("insert ignore into InvoiceErrors (Invoice, Type, Error) " +  
                 "values (%s, \'%s\' ,  \'%s\' )") % (
                    invoice, 'Order' , e))
            
            mydb.commit()
            mydb.close()
        
        filename = invoice.split('\\')[-1]
        shutil.copy(invoice, 
                  './/InvoicesReceived//Parsed Documents//Errors//' +
                  filename  ) 
    
                    
        