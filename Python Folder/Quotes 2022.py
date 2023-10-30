 
import pandas as pd
import pdfplumber
import re 
from datetime import datetime ,date
import PyPDF2 
import mysql.connector  
import shutil 
import os 
import glob
   
os.chdir('C://Users//DamianEtchevest//onedrive - naturalistone.com//Naturali' + 
         '/SALES REPORTS 2022')

#September_Invoices = pd.read_excel('.\\Book.xlsx', sheet_name = 'September',
#              skiprows= 1).iloc[1:,1:4]

def Parse_Quotes_Invoice(invoice):
     
    # mydb = mysql.connector.connect(
    #     host="naturalistone.cfbecwildn3j.us-east-1.rds.amazonaws.com",
    #     user = "admin",
    #     password="Ra7878782",
    #     database= "NaturaliStone",
    #     port = 3306)  
    
    # mycursor = mydb.cursor()
     
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
       
    InvoiceDate =  datetime.strptime(tables[0][1][0], '%m/%d/%Y')
    #datetime.strptime( re.findall('[0-9]+/[0-9]+/[0-9]+',text)[0], '%m/%d/%Y')
    
    InvoiceNum  = tables[0][1][1]
    #re.findall('[0-9]+', text.split(re.findall('[0-9]+/[0-9]+/[0-9]+',text)[0])[1])[0] 
     
    totalAmount = float(text.split('Total')[-1].split(
        '\n')[0].replace('$','').replace(',',''))
    
    SalesTax = float(text.split('Sales Tax')[-1].split(
        '\n')[0].split(' ')[-1].replace('$','').replace(',',''))
  
    try:
        Crating =  float(text.split('Crating')[-1].split(
            '\n')[0].split(' ')[-1].replace('$','').replace(',',''))
    except:
        Crating = 0.0
        
    try:
        Shipping =  float(text.split('Shipping')[-1].split(
            '\n')[0].split(' ')[-1].replace('$','').replace(',','')) 
    except:
        Shipping = 0.0
        
    try:
        OtherShipping = float(text.split('Insurance')[-1].split(
            '\n')[0].split(' ')[-1].replace('$','').replace(',',''))
    except:
        OtherShipping = 0.0
        
    Freight = Shipping + OtherShipping
         
    References = [item for item in MainTable[1]
                  if str(item) != 'None'] 
    Reference = References[0].title()
    
    if 'Invoice' in text2: 
        Customer = text2.split('Bill To')[1].split('\n')[1].title() 
    else:
        Customer = text2.split('Sold To:')[1].split('\n')[1].title() 
    
    # mycursor.execute(
    #     ('select SellerID from Seller ' + 
    #      'where SellerReference = \"%s\" ')  % (References[2]))
    # SellerID =  mycursor.fetchall()[0][0]

    # # CustomerID  
    # mycursor.execute(
    #     ('select CustomerID from Customers ' + 
    #      'where Reference = \"%s\" ')  % (Customer))
    # CustomerID = mycursor.fetchall()
    
    # if CustomerID == []:
    #     sql = ('Insert ignore into Customers (Reference) VALUES (%s)')
    #     val = [Customer]            
    #     mycursor.execute(sql, val)
    #     mydb.commit()
        
    #     mycursor.execute(
    #         ('select CustomerID from Customers ' + 
    #          'where Reference = \"%s\" ')   % (Customer))
    #     CustomerID = mycursor.fetchall()
    # CustomerID = CustomerID[0][0] 
 
    ProductsLines = list(map(lambda s: 
             ' '.join([item for item 
               in s if str(item) != 'None']).replace('\n',' '), 
         filter(lambda s: 'Special Order' in 
             ' '.join([item for item in s if str(item) != 'None']),
              MainTable))) 
    
    if ProductsLines != []:
        MaterialValues = sum([
            float(line.split(" ")[-1].replace( ',','').replace('T',''))
            for line in ProductsLines])
    else:
        MaterialValues = 0.0
           
    # Create a new DataFrame with the variables
    Invoice_df = pd.DataFrame({'Customer Name':[Customer],
                               'Order #':[InvoiceNum],
                               'Doc. Amount':[totalAmount],
                               'Sales Taxes':[SalesTax],
                               'Freight':[Freight],
                               'Crating':[Crating],
                               'Material Value':[MaterialValues],
                               'Total':[totalAmount],	
                               'Deposit':[totalAmount],
                               'Balance':[0],
                               'Quote Date':[InvoiceDate],
                               'Seller':[References[2]]})
     
    # mycursor.close() 
    # mydb.close()
    
    pdfFileObj.close() 
    return Invoice_df

# %% 
# =============================================================================
# 
# list_of_files = filter( os.path.isfile,
#            glob.glob('.\\Quotes 2022\\' + '*') ) 
# list_of_files = sorted( list_of_files,  key = os.path.getmtime)
#            
# # ParsedInvoices = pd.DataFrame(columns = [
# #     'Customer Name','Order #','Doc. Amount','Sales Taxes','Freight',
# # 	'Crating','Material Value','Total',	'Deposit','Balance','Quote Date','Seller'])
# ParsedInvoices = pd.read_excel('.\\ParsedInvoices.xlsx')
# 
# for file in list_of_files : 
#      print('\n', file)
#      ParsedInvoices = ParsedInvoices.append(Parse_Quotes_Invoice( file))
#      
# ParsedInvoices.to_excel('.\\ParsedInvoices.xlsx')
# =============================================================================
                              
    
# %% 

from concurrent.futures import ThreadPoolExecutor
from threading import Lock

list_of_files = filter(os.path.isfile, glob.glob('.\\Quotes 2022\\' + '*'))
list_of_files = sorted(list_of_files, key=os.path.getmtime)

#ParsedInvoices2 = pd.read_excel('.\\ParsedInvoices.xlsx', sheet_name = 'Sheet1')
ParsedInvoices = pd.DataFrame(columns = [
     'Customer Name','Order #','Doc. Amount','Sales Taxes','Freight',
  	'Crating','Material Value','Total',	'Deposit','Balance','Quote Date','Seller'])

# Create a lock object
append_lock = Lock()

def parse_file_and_append(file):
    try:
        print('\n', file)
        result = Parse_Quotes_Invoice(file)

        # Acquire the lock and append the result to ParsedInvoices
        with append_lock:
            global ParsedInvoices
            ParsedInvoices = ParsedInvoices.append(result)
        
        shutil.move(file,   
                    '.\\Parsed 2022\\' + file.split('\\')[-1] ) 
        print(f"{file} Moved to Parsed")
    except Exception as e:
        print(f"Error processing file {file}: {e}")
    
    
    return Parse_Quotes_Invoice(file)

# Set max_workers to the number of threads you want to use
with ThreadPoolExecutor(max_workers=20) as executor:
    executor.map(parse_file_and_append, list_of_files)
    
#ParsedInvoices.to_excel('.\\ParsedInvoice2s.xlsx')
        