# %% Setup Variables, connect to db, and get EURUSD. 

import pdfplumber
import re  
from datetime import datetime, date  
import mysql.connector 
import shutil
from Modified_Document_Parser import compare_file_text, Replace_file_text, move_file_with_rename
import PyPDF2 
import os 
from fuzzywuzzy import fuzz
  

def checkExisting(text, InvoiceNum, invoice, FreightName, DocType):
        
    pdfFileObj = open(invoice, 'rb')
    filesParsedInvoices  = [ x.split('.pdf')[0] for x in 
             os.listdir('.//InvoicesReceived//Parsed Documents//Freights//' + FreightName + '//' + DocType + '//') 
             if str(InvoiceNum) in x] 
    
    if DocType == 'Invoices':
        filesParsedInvoicesUnmapped  = [ x.split('.pdf')[0] for x in 
             os.listdir('.//InvoicesReceived//Parsed Documents//Freights//' + FreightName + '//Invoices//Unmapped//') 
             if str(InvoiceNum) in x] 
    else: 
        filesParsedInvoicesUnmapped = []
    
    filesErrors  = [ x.split('.pdf')[0] for x in 
             os.listdir('.//InvoicesReceived//Parsed Documents//Errors//Freight Errors//' + FreightName + '//' ) 
             if  str(InvoiceNum) in x] 
    
#################################################################################
    
    resultsParsedInvoices = [compare_file_text(invoice, x.split('.pdf')[0], 
      './/InvoicesReceived//Parsed Documents//Freights//' + FreightName + '//' + DocType + '//',  
      text, pdfFileObj )  for x in os.listdir(
          './/InvoicesReceived//Parsed Documents//Freights//' + FreightName + '//' + DocType + '//') 
     if  str(InvoiceNum) in x] 
    
    if DocType == 'Invoices':
        resultsParsedInvoicesUnmapped  = [compare_file_text(invoice, x.split('.pdf')[0], 
      './/InvoicesReceived//Parsed Documents//Freights//' + FreightName + '//Invoices//Unmapped//',  
      text, pdfFileObj )  for x in os.listdir(
          './/InvoicesReceived//Parsed Documents//Freights//' + FreightName + '//Invoices//Unmapped//') 
     if  str(InvoiceNum) in x] 
    else: 
        resultsParsedInvoicesUnmapped = []
    
    resultsErrors = [compare_file_text(invoice, x.split('.pdf')[0], 
      './/InvoicesReceived//Parsed Documents//Errors//Freight Errors//' + FreightName + '//',  
      text, pdfFileObj )  for x in 
           os.listdir('.//InvoicesReceived//Parsed Documents//Errors//Freight Errors//' + FreightName + '//') 
     if  str(InvoiceNum) in x] 
    
    pdfFileObj.close() 
     
#################################################################################
    
    if "Same" in resultsParsedInvoices or 'Same' in resultsErrors or 'Same' in resultsParsedInvoicesUnmapped: 
        
        if 'Same' in resultsErrors:
            os.remove( './/InvoicesReceived//Parsed Documents//Errors//Freight Errors//' + FreightName +  '//' +  
                filesErrors[resultsErrors.index("Same")] + '.pdf')
            
            shutil.move(invoice, 
                      './/InvoicesReceived//Parsed Documents//Errors//Freight Errors//' + FreightName +  '//' + 
                      filesErrors[resultsErrors.index("Same")] + '.pdf') 
            print(f"{invoice} Same, replaced with new file in Successes")  
            
        elif 'Same' in resultsParsedInvoicesUnmapped:
            os.remove( './/InvoicesReceived//Parsed Documents//Freights//' + FreightName + '//Invoices//Unmapped//' + 
                filesParsedInvoicesUnmapped[resultsParsedInvoicesUnmapped.index("Same")] + '.pdf')
            
            shutil.move(invoice, 
                      './/InvoicesReceived//Parsed Documents//Freights//' + FreightName + '//Invoices//Unmapped//'  +
                      filesParsedInvoicesUnmapped[resultsParsedInvoicesUnmapped.index("Same")] + '.pdf') 
            print(f"{invoice} Same, replaced with new file in Successes")
            
        else:
            os.remove( './/InvoicesReceived//Parsed Documents//Freights//' + FreightName +  '//' + DocType + '//' + 
                filesParsedInvoices[resultsParsedInvoices.index("Same")] + '.pdf')
            
            shutil.move(invoice, 
                      './/InvoicesReceived//Parsed Documents//Freights//' + FreightName + '//' + DocType + '//'  +
                      filesParsedInvoices[resultsParsedInvoices.index("Same")] + '.pdf') 
            print(f"{invoice} Same, replaced with new file in Successes")
        return True 
    else: 
        return False
   
# %%      
def Parse_Freight_Invoice(invoice):
     
    mydb = mysql.connector.connect(
        host="naturalistone.cfbecwildn3j.us-east-1.rds.amazonaws.com",
        user = "admin",
        password="Ra7878782",
        database= "NaturaliStone",
        port = 3306)  
    
    mycursor = mydb.cursor()
    
    Errors = []
    mycursor.execute("select FactoryID, Factory_Name from Factory " ) 
    FactoryID = mycursor.fetchall() 
    
    Remove = False
    try:
        PDFText = PyPDF2.PdfFileReader(invoice).getPage(0).extractText()
    except:
        Remove = True
        pass
     
    with pdfplumber.open(invoice) as pdf:
         if len(pdf.pages) == 1:
             page = pdf.pages[0]
             text = page.extract_text()
             tables = page.extract_tables() 
         else:   
             text = ''.join(pdf.pages[i].extract_text() 
                            for i in range(len(pdf.pages)))
             tables = (pdf.pages[0].extract_tables() +
                       pdf.pages[1].extract_tables() ) 
             
                 
    pdfFileObj = open(invoice, 'rb')
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj) 
    PDFText = ""
    
    # Iterating through each page
    for pageNum in range(pdfReader.numPages):
        pageObj = pdfReader.getPage(pageNum)
        PDFText += pageObj.extractText()
    
    pdfFileObj.close() 
    
    FreightName = 'General Noli'
    
    if any("House Bill Of Lading" in x for x in PDFText.split('\n')[:5]):
         DocNumber = [x for x in tables[0][1] if x != None and 'Document' in x][0].split('\n')[1]  
         DocType = 'House Bill Of Lading'
         
         if not(checkExisting(text, DocNumber, invoice, FreightName, DocType)):  
             move_file_with_rename(invoice, DocNumber,  
                   './/InvoicesReceived//Parsed Documents//Freights//General Noli//House Bill Of Lading//') 
             
             print("Moved to Freights House Bill Of Lading ", DocNumber)
             mydb.close() 
             return 
         else: 
             return 
         
    elif any("SHIPMENT PRE NOTICE" in x for x in text.split('\n')[:10]):
         try:
             DocNumber = [x.replace('Our ref. no.','') for x in PDFText.split('\n') if  'Our ref. no.' in x][0]
         except:
            DocNumber = [x.replace('Billing ref.','') for x in PDFText.split('\n') if  'Billing ref.' in x][0]
            
         DocType = 'Shipment Pre Notice'
          
         if not(checkExisting(text, DocNumber, invoice, FreightName, DocType)):  
             move_file_with_rename(invoice, DocNumber,  
                   './/InvoicesReceived//Parsed Documents//Freights//General Noli//Shipment Pre Notice//') 
             
             print("Moved to Freights Shipment Pre Notice ", DocNumber)
             mydb.close() 
             return 
         else: 
             return  
     
    elif any('FREIGHT BILL / ARRIVAL NOTICE' in x for x in text.split('\n')[:10]): 
         DocType = 'Arrival Notice'
          
         if not(checkExisting(text, invoice.split('\\')[-1][:-4], invoice, FreightName, DocType)):  
             move_file_with_rename(invoice, invoice.split('\\')[-1][:-4],  
                   './/InvoicesReceived//Parsed Documents//Freights//General Noli//Arrival Notice//') 
             
             print("Moved to Freights Arrival Notice ", (invoice.split('\\')[-1]))
             mydb.close() 
             return 
         else: 
             return   
         
    elif any('I N V O I C E' in x for x in text.split('\n')[:10])  : 
         
         InvoiceValue = re.findall('[0-9]+',text.split(
            'TOTAL TO YOUR DEBIT')[1].split("\n")[1].replace(',',''))[1]
        
         BillingReference = [x.split(' ')[-1]  for x in text.split('\n')
                             if  'Origin Ref' in x][0]
         
         InvoiceNumber = next(re.search(r'(\d+)(?=\sOur ref.:)', line).group(0) 
                              for line in text.split('\n')[:15] 
                              if re.search(r'(\d+)(?=\sOur ref.:)', line))
         
         DocType = 'Invoices'
         
         if not(checkExisting(text, InvoiceNumber, invoice, FreightName, DocType)):   
            pass
         else:   
            return
         
         DescriptionOfGoods = text.split(
             'Description of Goods')[1].split("\n")[1].split('   ')[0]
         
         Packages = re.findall('[0-9]+', text.split( 
             DescriptionOfGoods)[1])[0]
         
         GrossWeight = re.findall('[0-9]+', text.split( 
             DescriptionOfGoods)[1])[1]
         
         DescriptionOfGoods = DescriptionOfGoods.replace(',','-')
         
           
         HBL = text.split(re.findall('[0-9]+/[0-9]+/[0-9]+', 
                    text.split('Date of arrival')[1])[1])[1].split(' ')[1]
         
         FreightRefNumber = text.split('Origin Ref.: ')[1].split('\n')[0]
          
       
         mycursor.execute(
            " select * from FreightInvoices WHERE FreightRefNumber = \'%s\' " % (FreightRefNumber))
            
         if mycursor.fetchall() != []: 
             mycursor.execute(
                 """ 
                 update FreightInvoices 
                 set DescriptionOfGoods =  \'%s\'  , 
                     Packages  = %s , 
                     GrossWeight  = %s , 
                     HBL = \'%s\' ,
                     TotalCost = %s ,
                     InvoiceNumber = %s
                 where FreightRefNumber = %s
                 """ % 
                 (DescriptionOfGoods, Packages, GrossWeight, HBL, 
                  InvoiceValue,InvoiceNumber, FreightRefNumber)) 
             mydb.commit()
             print('Updated freight invoice', FreightRefNumber)
                 
             move_file_with_rename(invoice, InvoiceNumber,  
                   './/InvoicesReceived//Parsed Documents//Freights//General Noli//Invoices//') 
             print("Moved to Freights INVOICE ", InvoiceNumber)
             mydb.close() 
             return 
         else:
                 
             move_file_with_rename(invoice, InvoiceNumber,  
                   './/InvoicesReceived//Parsed Documents//Freights//General Noli//Invoices//Unmapped//')  
             mydb.close() 
             return print('Could not load freight invoice', InvoiceNumber) 
           
    elif all('SHIPMENT CONFIRMATION' not in x for x in text.split('\n')[:10]): 
         
         DocType = 'Other Docs'
         DocNumber  = invoice.split('\\')[-1][:-4]
         
         if not(checkExisting(text, DocNumber, invoice, FreightName, DocType)):   
             move_file_with_rename(invoice, DocNumber,  
                   './/InvoicesReceived//Parsed Documents//Freights//General Noli//Other Docs//') 
             
             print("Moved to Freights Other Docs ", DocNumber)
             mydb.close() 
             return 
         else: 
             return  
          
    try:  
        Info = text.split('\n')[[text.split('\n').index(x)  for x in text.split('\n') 
                                 if  'Document date' in x][0] + 1]
        
        InvoiceDate = datetime.strptime(' '.join(Info.split(' ')[2:]), "%b %d, %Y") 
        DocumentNumber = Info.split(' ')[0]
        FreightRefNumber = Info.split(' ')[1]
        
        info2 = text.split('\n')[[text.split('\n').index(x) for x in text.split('\n') 
                            if  'Arrival Date' in x][0] + 1]
        EstimatedDate = datetime.strptime(' '.join(info2.split(' ')[-3:]), "%b %d, %Y")  
        try:
            Destination = (info2.split('IT')[1].split('-')[0] + 'US').lstrip()
            Origin = info2.split('IT')[0] + 'IT'
        except: 
            Destination = (info2.split('Place Of Receipt ')[1].split('-')[0] + 'US').lstrip()
            Origin = text.split('\n')[[text.split('\n').index(x) for x in text.split('\n') 
                                 if  'Port Of Loading Departure Date' in x][0] - 1]
            
        try:
            info3 = text.split('\n')[[text.split('\n').index(x)  for x in text.split('\n') 
                                if  'Voyage Nr. MBL Booking Number' in x][0] + 1].split(' ')
            Voyage_Number = info3[-3]
            Booking_Number = info3[-1]
        except:
            info3 = text.split('\n')[[text.split('\n').index(x)  for x in text.split('\n') 
                                if  'Voyage Nr. Booking Number' in x][0] + 1].split(' ')
            Voyage_Number = info3[-2]
            Booking_Number = info3[-1]
         
        order_dict = {}
        header_line = 'VolumePackages WeightGoods Description'
        header_line2 = 'Container Type PackagesWeightGoods Description'
#        factory_line_indicator = 'VolumePackages WeightGoods Description'
        start_order_indicator = 'Consignee Purchase Orders'
        start_order_indicator2 = 'Consignee Purchase'
        end_order_indicator = 'Pickup Planned'
  
        if any(header_line2 in x for x in PDFText.split('\n')):
            for i, line in enumerate(PDFText.split('\n')):
               if header_line2 == line: 
                    factory_line = PDFText.split('\n')[i+3].title()
                    Factory, highest_probability = max(((Factory, fuzz.token_set_ratio(factory_line, Factory))
                                                       for Factory in FactoryID),
                                                      key=lambda x: (x[1], len(x[0])))
                    if highest_probability < 70:
                        Errors.append('Factory Unknown -- ' + factory_line)
                        raise ValueError()
                    IDFactory = Factory[0]
                    orders = []
                    for j, next_line in enumerate(PDFText.split('\n')[i+3:], start=i+3):
                        if start_order_indicator2 in next_line:
                            k = 1
                            orders = []
                            while end_order_indicator not in PDFText.split('\n')[j+k] :
                                order_line = PDFText.split('\n')[j+k]
                                found_orders = re.findall(r'[\d/]+ -', order_line)  # updated regex to account for '/'
                                found_orders = [re.sub(r' -', '', order) for order in found_orders]
                                found_orders = [re.sub(r' \- Mar \d+, \d+', '', order) for order in found_orders]
                                orders.extend(found_orders)
                                k += 1
                            orders = list(set(orders))  # removing duplicates
                            if factory_line in order_dict:
                                order_dict[IDFactory] = list(set(order_dict[IDFactory] + orders))
                            else:
                                order_dict[IDFactory] = orders
                            break 
        else:
            for i, line in enumerate(PDFText.split('\n')):
                if header_line == line:
                    factory_line = PDFText.split('\n')[i+2].title()
                    Factory, highest_probability = max(((Factory, fuzz.token_set_ratio(factory_line, Factory))
                                                       for Factory in FactoryID),
                                                      key=lambda x: (x[1], len(x[0])))
                    if highest_probability < 70:
                        Errors.append('Factory Unknown -- ' + factory_line)
                        raise ValueError()
                    IDFactory = Factory[0]
                    for j, next_line in enumerate(PDFText.split('\n')[i+3:], start=i+3):
                        if start_order_indicator in next_line:
                            k = 1
                            orders = []
                            while end_order_indicator not in PDFText.split('\n')[j+k] :
                                order_line = PDFText.split('\n')[j+k]
                                found_orders = re.findall(r'[\d/]+ -', order_line)  # updated regex to account for '/'
                                found_orders = [re.sub(r' -', '', order) for order in found_orders]
                                found_orders = [re.sub(r' \- Mar \d+, \d+', '', order) for order in found_orders]
                                orders.extend(found_orders)
                                k += 1
                            orders = list(set(orders))  # removing duplicates
                            if factory_line in order_dict:
                                order_dict[IDFactory] = list(set(order_dict[IDFactory] + orders))
                            else:
                                order_dict[IDFactory] = orders
                            break 
            
        for order in order_dict: 
            if order_dict[order] == []:
                Errors.append('Unmatched ' + str(order)) 
            for item in order_dict[order]:
                if order == 1: 
                    order_dict[order] =  str(int(item))
                    item = int(item) 
                elif order == 5: 
                    order_dict[order] =  item.split('/')[-1] 
                    item = item.split('/')[-1] 
                # Prepare the   
                mycursor.execute(
                    """
                    select * from Orders 
                    WHERE OrderID = %s AND FactoryID = %s
                    """, (item, order))
                    
                if mycursor.fetchall() == []  :
                    Errors.append('Unmatched ' + str(order) + ' -- ' + item) 
       
        if Errors == []:
            result = compare_file_text(invoice, DocumentNumber, 
              './/InvoicesReceived//Parsed Documents//Freights//General Noli//Shipment Confirmation//',  
              PDFText, pdfFileObj )
            
            if result == "Same":
                pdfFileObj.close()
                # If the text is the same, remove the file from the given folder
                os.remove(
                    './/InvoicesReceived//Parsed Documents//Freights//General Noli//Shipment Confirmation//' +
                        DocumentNumber + '.pdf')
                shutil.move(invoice, 
                          './/InvoicesReceived//Parsed Documents//Freights//General Noli//Shipment Confirmation//' +
                          DocumentNumber + '.pdf') 
                print(f"{invoice} Same, replaced with new file")
                return 
     
            mycursor.execute("select Freight.FreightKey,FreightRefNumber, TotalCost, " + 
                             "CompanyName from FreightInvoices FR " + 
                     "right join Freight on Freight.FreightKey = FR.FreightKey " +
                     "where CompanyName = 'GENERAL NOLI'" +
                     "order by TotalCost desc" )
            FreightData = mycursor.fetchall()  
            FreightKey = FreightData[0][0] 
                
            if True not in [FreightRefNumber in x for x in FreightData]: 
                sql = ( """ 
                       insert ignore into FreightInvoices (FreightRefNumber, FreightKey,  
                      InvoiceDate, EstimatedDate, Destination, Origin, Voyage_Number,
                      Shipment_Confirmation_DocumentNumber,
                      Shipment_Confirmation_Booking_Number) values  
                      (%s, %s, %s, %s, %s, %s,%s , %s, %s) """) 
                mycursor.execute(sql, (FreightRefNumber, FreightKey, 
                                       InvoiceDate, EstimatedDate, Destination,
                                       Origin, Voyage_Number,DocumentNumber,  Booking_Number ))
                mydb.commit()
                
                print(FreightRefNumber, '--- Commited')
            else: 
                print(FreightRefNumber, '--- Already in db') 
             
            data_to_insert = []

            for Factory in order_dict: 
                if isinstance(order_dict[Factory], list):
                    for order in order_dict[Factory]:
                        data_to_insert.append((FreightRefNumber, Factory, order) )
                else:
                    data_to_insert.append((FreightRefNumber, Factory, order_dict[Factory]) )
              
            # Prepare the query
            query = """
                UPDATE Orders SET FreightRefNumber = %s  
                WHERE FactoryID = %s AND OrderID = %s 
            """ 
            # Use executemany() to execute the query for all items in the list
            mycursor.executemany(query, data_to_insert) 
            # Commit the transaction
            mydb.commit()
         
            mycursor.execute(
                "delete from InvoiceErrors where Invoice =  \'%s\' and Type = 'Freight' " % (
                FreightRefNumber)) 
            mydb.commit()  
            mydb.close() 
            
            move_file_with_rename(invoice, FreightRefNumber,  
                   './/InvoicesReceived//Parsed Documents//Freights//General Noli//Shipment Confirmation//') 
             
        else:
            raise ValueError()
             
    except: 
        print(invoice.split('\\')[-1].replace('.pdf',''), 
              'Inserted in Errors table')
        
        pdfFileObj.close()
        shutil.move(invoice,  
                  './/InvoicesReceived//Parsed Documents//' +
                  'Errors//Freight Errors//General Noli//' + FreightRefNumber + '.pdf')  
        
        mycursor.execute(
            ("insert ignore into InvoiceErrors (Invoice, Type, Error) " +  
             "values (\'%s\' ,'Freight', \'%s\' )") % 
            (FreightRefNumber ,'//'.join(Errors) )) 
        mydb.commit()
  
    mydb.close()
    