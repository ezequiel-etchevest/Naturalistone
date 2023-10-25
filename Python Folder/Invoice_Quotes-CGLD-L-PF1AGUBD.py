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
  

def Move_to_Prev(Success, InvoiceNum, invoice):
    
    ######### Move any Previous Versions of Parsed Invoices in Invoice Naturali folder
    #########      to Mod Prev Version 
    filtered_ParsedInvoices = [ inv for inv in 
       os.listdir('.//InvoicesReceived//Parsed Documents//Invoice Naturali//') 
       if InvoiceNum in inv]
    
    for inv in filtered_ParsedInvoices:
        move_file_with_rename(
            './/InvoicesReceived//Parsed Documents//Invoice Naturali//' + inv, 
                inv.split('.pdf')[0],
            './/InvoicesReceived//Parsed Documents//Modifications (Prev Version)//' )  
      
    ######### Move any error quotes to Mod Prev Version
    filtered_invoiceErrors =  [inv for inv in 
       os.listdir('.//InvoicesReceived//Parsed Documents//Errors//Quote Errors//') 
       if InvoiceNum in inv]
    
    for inv in filtered_invoiceErrors:
        move_file_with_rename(
            './/InvoicesReceived//Parsed Documents//Errors//Quote Errors//' + inv, 
                inv.split('.pdf')[0],
            './/InvoicesReceived//Parsed Documents//Modifications (Prev Version)//' )   
         
    
    if Success:
        move_file_with_rename(invoice, InvoiceNum, 
          './/InvoicesReceived//Parsed Documents//Invoice Naturali//') 
    else: 
        move_file_with_rename(invoice, InvoiceNum,
          './/InvoicesReceived//Parsed Documents//Errors//Quote Errors//')  
        
# %% 
def Parse_Quotes_Invoice(invoice):
    
    Errors = []
    mydb = mysql.connector.connect(
        host="naturalistone.cfbecwildn3j.us-east-1.rds.amazonaws.com",
        user = "admin",
        password="Ra7878782",
        database= "NaturaliStone",
        port = 3306)  
    
    mycursor = mydb.cursor()
    
    Remove = False
    PDFText = ''
    try:
        PDFText = PyPDF2.PdfFileReader(invoice).getPage(0).extractText()
    except:
        Remove = True
        pass
     
    if  Remove or (('orders@naturalistone.com' not in PDFText and 
        ('Quote Number' not in PDFText or 
        'CREDIT CARD AUTHORIZATION' in PDFText) or 
        'DocuSign Envelope' in PDFText )):  
        mydb.close()   
        if ('Invoice' in PDFText and 'Quote Number' not in PDFText): 
            
            move_file_with_rename(invoice,  (invoice.split('\\')[-1] ), 
                      './/InvoicesReceived//Parsed Documents//' +
                      'Other Attachments//Invoices//' )
            print("Removed to Other Attachments -  Invoices" )
        else:
            shutil.move(invoice, 
                      './/InvoicesReceived//Parsed Documents//' +
                      'Other Attachments//' + (invoice.split('\\')[-1] ))
            print("Removed to Other Attachments" )
        return 
         
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
              
    try:  
        InvoiceDate =  datetime.strptime(tables[0][1][0], '%m/%d/%Y')
        #datetime.strptime( re.findall('[0-9]+/[0-9]+/[0-9]+',text)[0], '%m/%d/%Y')
        
        InvoiceNum  = tables[0][1][1]
        #re.findall('[0-9]+', text.split(re.findall('[0-9]+/[0-9]+/[0-9]+',text)[0])[1])[0] 
        
        filesParsedInvoices  = [ x.split('.pdf')[0] for x in 
                 os.listdir('.//InvoicesReceived//Parsed Documents//Invoice Naturali//') 
                 if InvoiceNum in x] 
        
        filesErrors  = [ x.split('.pdf')[0] for x in 
                 os.listdir('.//InvoicesReceived//Parsed Documents//Errors//Quote Errors//') 
                 if InvoiceNum in x] 
        
        resultsParsedInvoices = [compare_file_text(invoice, x.split('.pdf')[0], 
          './/InvoicesReceived//Parsed Documents//Invoice Naturali//',  
          text, pdfFileObj )  for x in os.listdir(
              './/InvoicesReceived//Parsed Documents//Invoice Naturali//') 
         if InvoiceNum in x] 
        
        resultsErrors = [compare_file_text(invoice, x.split('.pdf')[0], 
          './/InvoicesReceived//Parsed Documents//Errors//Quote Errors//',  
          text, pdfFileObj )  for x in 
               os.listdir('.//InvoicesReceived//Parsed Documents//Errors//Quote Errors//') 
         if InvoiceNum in x] 
        
         
        if "Same" in resultsParsedInvoices:
            mydb.close()   
            pdfFileObj.close() 
            os.remove( './/InvoicesReceived//Parsed Documents//Invoice Naturali//' +
                    filesParsedInvoices[resultsParsedInvoices.index("Same")] + '.pdf')
            shutil.move(invoice, 
                      './/InvoicesReceived//Parsed Documents//Invoice Naturali//' +
                      filesParsedInvoices[resultsParsedInvoices.index("Same")] + '.pdf') 
            print(f"{invoice} Same, replaced with new file in Successes")
            return 
            
        totalAmount = float(text.split('Total')[-1].split(
            '\n')[0].replace('$','').replace(',',''))
    
        #  Buyer = pageObj.extractText().split('Sold To:')[1].split('\n')[1]
        #  Reference = pageObj.extractText().split('Reference')[1].split('\n')[1]

        References = [item for item in MainTable[1]
                      if str(item) != 'None'] 
        Reference = References[0].title()
        ShippingMethod = References[4]
            #pageObj.extractText().split( 'Reference')[0].split('\n')[-1]
               
        Customer = text2.split('Sold To:')[1].split('\n')[1].title()
        EstDeliveryDate = datetime.strptime(References[3], '%m/%d/%Y')
        #pageObj.extractText().split( 'Sales Person')[0].split('\n')[-1]
        
        mycursor.execute(
            ('select SellerID from Seller ' + 
             'where SellerReference = \"%s\" ')  % (References[2]))
        SellerID =  mycursor.fetchall()[0][0]

        # CustomerID 
 
        mycursor.execute(
            ('select CustomerID from Customers ' + 
             'where Reference = \"%s\" ')  % (Customer))
        CustomerID = mycursor.fetchall()
        
        if CustomerID == []:
            sql = ('Insert ignore into Customers (Reference) VALUES (%s)')
            val = [Customer]            
            mycursor.execute(sql, val)
            mydb.commit()
            
            mycursor.execute(
                ('select CustomerID from Customers ' + 
                 'where Reference = \"%s\" ')   % (Customer))
            CustomerID = mycursor.fetchall()
        CustomerID = CustomerID[0][0] 

             
        # INSERT INVOICE IN SALES TABLE   
        
        existing_df = pd.DataFrame(columns=["UnitPrice", "ProdNameID",
                                            "DimensionID", "Quantity"])
           
        ProductsLines = list(map(lambda s: 
                 ' '.join([item for item 
                   in s if str(item) != 'None']).replace('\n',' '), 
             filter(lambda s: 'Special Order' in 
                 ' '.join([item for item in s if str(item) != 'None']),
                  MainTable))) 
       
            
# %%  PRODUCT DETAILS 
        if ProductsLines != []:
            for line in ProductsLines:  
            
                line = line.replace('"','').replace("'",'').title().replace('X','x').replace("”","")
                LineSplit = line.split("Order:")[1].strip().split(" ") 
                
                #LineSplit[LineSplit.index('Order:')+1]
                Quantity = float(line.split(" ")[0].replace(',',''))
                UnitPrice = float(LineSplit[-2].replace(',',''))
                 
                
                #Get all avaiable Materials 
                mycursor.execute('select distinct(Material) from ProdNames where Material is not null')
                Materials = [Material[0] for Material in mycursor.fetchall() ] 
                
                if any(Material in line for Material in Materials ):
                    MaterialType = [Material for Material in Materials
                              if Material in line][0] 
                else:  
                    MaterialType = None  
                 
                #Get all avaiable Finsishes
                mycursor.execute('select distinct(Finish) from Dimension where Finish is not null')
                Finishes = [Finish[0] for Finish in mycursor.fetchall() ]   
                 
                if any(finish in line for finish in Finishes):  
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
                                    fuzz.token_set_ratio(line, Finish)) 
                                   for Finish in Finishes), key=lambda x: (x[1], len(x[0])))
                    
                    if highest_probability < 80: 
                        Errors.append('Finish ' + line) 
                        raise ValueError() 
                    else:
                        Finish = Finish_best_match
                        
                Finish = 'Natural' if all(x in line
                          for x in ['Easy Extra White','Matte']) else Finish
                 
                #Get all avaiable Thicknesses  
                mycursor.execute('select distinct(Thickness) from Dimension where Thickness is not null')
                Thicknesses = [thickness[0].title()  for thickness in mycursor.fetchall() ]
                Thicknesses.append('11/4')
                ThicknessLine = ''.join(LineSplit[:-2]).replace('.5x','').replace(
                    '.5','1/2').replace('12Mm','1/2').replace('20Mm','3/4'
                  ).replace('2Mc','3/4').replace('3Mc','1 1/4').replace(
                      '2Cm','3/4').replace('3Cm','1 1/4').replace('9Mm','3/8')
                
                if any(Thickness in ThicknessLine for Thickness in Thicknesses):
                    Thickness = [Thickness for Thickness in Thicknesses
                          if Thickness in ThicknessLine][0]
                    if Thickness == '11/4':
                        Thickness = '1 1/4'  
                elif MaterialType == 'Porcelain':
                    Thickness = '3/8'
                else:  
                    Errors.append('Thickness ' + line) 
                    raise ValueError()
                
                # Sizes
                mycursor.execute('select distinct(Size) from Dimension')
                AllSizes = mycursor.fetchall()  
                try:
                    Size = [Size for Size in AllSizes
                            if Size[0] in line.replace(' ','').replace("’",'')][0][0]
                    
                    # DIMENSION ID
                    query = """
                        SELECT DimensionID FROM Dimension 
                        WHERE Size = '{}' and Thickness {} and Finish {}
                    """.format(Size, f"= '{Thickness}'",f"= '{Finish}'")
                    
                    mycursor.execute(query)
                    DimensionID = mycursor.fetchall() 
                    if DimensionID == []:
                        raise ValueError()
                    else:
                        DimensionID = DimensionID[0][0] 
                        
                except:
                    Errors.append('Dimension ' + line)  
                     
                # PRODNAME ID  
                mycursor.execute(
                     """ select ProdNameID, Naturali_ProdName, Material from ProdNames 
                         where Naturali_ProdName is not null and Material is not null """ )
                ProdNames = mycursor.fetchall()  
                try:
                    line = line.replace('Calacatta Special', 'Calacatta Especial') 
                    if MaterialType == 'Terrazzo':
                        line = line.replace('White Thassos', 'Thassos Bianco')
                        line = line.replace(' And ',' & ')
                        line = line.replace('Bardiglio Veneto', 'Bardiglio Venato')
                        line = line.replace('Montenero', 'Monte Nero')
                    line = line.replace('Calcatta', 'Calacatta') 
                    line = line.replace('Sienna Gris', 'Sienna Grigio') 
                    line = line.replace('Creman Dolce', 'Crema Dolce') 
                    line = line.replace('MonteLeCiel', 'Monte LeCiel') 
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
            
        # except Exception as e: 
        #     try: 
        #         Errors.append(line)
        #     except: 
        #         Errors.append(e)
        #         pass
    except:
        pass

# %% Inserts into DB 
    if Errors == []:
                
        # PROJECT ID     
        mycursor.execute(
            ('select idProjects from Projects where ' + 
            'ProjectName = \"%s\" and CustomerID = %s') % 
            (Reference ,CustomerID))
        idProjects = mycursor.fetchall()
        
        if idProjects == []: 
            sql = ('Insert ignore into ' +
                   'Projects (ProjectName, CustomerID) VALUES (%s, %s);' )
            val = [Reference ,CustomerID]            
            mycursor.execute(sql, val )
            mydb.commit() 
            
            mycursor.execute(
                ('select idProjects from Projects where ' + 
                'ProjectName = \"%s\" and CustomerID = %s') % 
                (Reference ,CustomerID))
            
            idProjects = mycursor.fetchall()
        idProjects = idProjects[0][0]
        
        mycursor.execute(""" INSERT into Sales 
         (Naturali_Invoice, Value, ProjectID, 
         InvoiceDate, EstDelivery_Date,  SellerID, 
         ShippingMethod) VALUES (%s, %s, %s, \'%s\', \'%s\', %s, \'%s\') 
         ON DUPLICATE KEY UPDATE 
            Value = %s, 
            ProjectID = %s, 
            InvoiceDate = \'%s\',
            EstDelivery_Date = \'%s\', 
            SellerID = %s, 
            ShippingMethod = \'%s\', 
            ModificationFlag = 'True',
            LastInsertDate = \'%s\' ;""" %
            (InvoiceNum, totalAmount, idProjects,
             InvoiceDate, EstDeliveryDate,
             SellerID,  ShippingMethod,
             totalAmount, idProjects, InvoiceDate,
             EstDeliveryDate, SellerID,  ShippingMethod, 
             date.today()))
         
        mydb.commit()
             
        if ProductsLines == []:
            
            existing_df = pd.DataFrame({"UnitPrice": [totalAmount],
                                        "ProdNameID": [1765],
                                        "DimensionID": [10195],
                                        "Quantity": [1]})
            
            # results = [compare_file_text(invoice, x.split('.pdf')[0], 
            #   './/InvoicesReceived//Parsed Documents//Invoice Naturali//'+ 
            #       'Shipping- Delivery Curbside Quotes//',  
            #   text, pdfFileObj )  for x in os.listdir(
            #       './/InvoicesReceived//Parsed Documents//Invoice Naturali//'+ 
            #       'Shipping- Delivery Curbside Quotes//') 
            #  if InvoiceNum in x] 
                  
            # mydb.close()   
            # pdfFileObj.close() 
            # if 'Same' not in results:
            #     move_file_with_rename(invoice,  InvoiceNum, 
            #           './/InvoicesReceived//Parsed Documents//Invoice Naturali//'+ 
            #           'Shipping- Delivery Curbside Quotes//' )
            #     return print("Removed to Shipping- Delivery Curbside Quotes ",
            #                  InvoiceNum ) 
            # else:
            #     os.remove(invoice)
            #     return print('Same in Shipping- Delivery Curbside Quotes', 
            #                  InvoiceNum)
            
        existing_df = existing_df.groupby(
            ["UnitPrice", "ProdNameID", "DimensionID"]).agg(
            {"Quantity": "sum"}).reset_index()  
         
        ProdIDs = []
        for index, row in existing_df.iterrows(): 
            
            
            mycursor.execute(
                 """ select ProdID, Updated_Date, SalePrice from Products 
                 where ProdNameID = %s and DimensionID = %s """
                 % (row['ProdNameID'], row['DimensionID']))   
            try:
                ProdID, Updated_Date, SalePrice = zip(*mycursor.fetchall())
                ProdID = ProdID[0]
                if Updated_Date[0] < InvoiceDate.date() and SalePrice[0] <= row['UnitPrice'] : 
                     mycursor.execute(
                         ("Update Products " +
                          "set SalePrice = %s , " +
                          "Updated_Date = \'%s\'  ," + 
                          "Update_Method = 'Quote' " + 
                          "where ProdID = %s")
                         % (row['UnitPrice'] ,
                            InvoiceDate, 
                            ProdID)) 
                     mydb.commit() 
                     
            except:
                 # If it hasnt, then insert. Else do nothing.  
                 mycursor.execute(
                     ("insert into Products (ProdNameID, DimensionID, " +
                      "SalePrice, Updated_Date)" + 
                      " values (%s, %s, %s, \'%s\' )") % 
                     (row['ProdNameID'], row['DimensionID'], 
                      row['UnitPrice'], InvoiceDate))
                 mydb.commit()
                 
                 mycursor.execute(
                      """ select ProdID  from Products 
                      where ProdNameID = %s and DimensionID = %s """
                      % (row['ProdNameID'], row['DimensionID']))  
                 ProdID = mycursor.fetchall()[0][0] 
             
            # PRODSOLD ID
            mycursor.execute(
                ('select ProdID from ProdSold where ' + 
                'SaleID = %s and ProdID = %s') % 
                (InvoiceNum ,ProdID))
            ProdSoldID = mycursor.fetchall()
            
            if ProdSoldID == []:  
                sql = """ Insert ignore into  
                        ProdSold (SaleID, ProdID, Quantity, SalePrice) 
                        VALUES (%s, %s, %s, %s ) """
                val = [int(InvoiceNum), ProdID, 
                       float(row['Quantity']) , float(row['UnitPrice'])]            
                mycursor.execute(sql, val )
                mydb.commit()
            else: 
                sql = """ update ProdSold 
                    set Quantity = %s, SalePrice = %s, Status = 'Pending'
                    where SaleID = %s and ProdID = %s """
                val = [float(row['Quantity']) , float(row['UnitPrice']), 
                       InvoiceNum, ProdID ]            
                mycursor.execute(sql, val )
                mydb.commit()
                    
            ProdIDs.append(ProdID) 
            
            
        # Define the lambda function to update the database
        update_status = lambda prod: (
            mycursor.execute(
                """update ProdSold set ProdSold.Status = 'Canceled' 
                where ProdID = %s """ % (prod)
            ),
            mydb.commit()
        )
         
        mycursor.execute(('select ProdID from ProdSold where ' + 
                          'SaleID = %s ') % (InvoiceNum ))
        AllProdsSold = mycursor.fetchall()
        
        # Iterate through the filtered list and apply the lambda function
        filtered_prods = [Prod for Prod in AllProdsSold if Prod[0] not in ProdIDs]
        
        for prod in filtered_prods:
            update_status(prod)
             
        print(InvoiceNum, 
          "Record inserted successfully") 
        
        mycursor.execute(
            "delete from InvoiceErrors where Invoice = %s " % (InvoiceNum))
        mydb.commit()   
         
        pdfFileObj.close()  
        
        Move_to_Prev(True, InvoiceNum, invoice)
        
    else: 
        
        mycursor.execute(
            "delete from InvoiceErrors where Invoice = %s " % (InvoiceNum))
        mydb.commit()   
        
        print("Failed to insert record into MySQL table" )
        mycursor.execute(
            ("insert ignore into InvoiceErrors" + 
             "(Invoice, Type, Date, Error, SellerID) " +  
             "values (%s, \'%s\' ,  \'%s\', \'%s\', %s ) ") % (
                InvoiceNum, 'Quote' , 
                InvoiceDate, '// '.join(Errors), SellerID)) 
        mydb.commit()
       
        pdfFileObj.close() 
        if "Same" in resultsErrors and 'Errors' not in invoice:
            (os.remove( 
                './/InvoicesReceived//Parsed Documents//Errors//Quote Errors//' +
                    file + '.pdf') for file in 
            [filesErrors[i] for i, x in enumerate(resultsErrors) if x == "Same"])
            
            shutil.move(invoice, 
                './/InvoicesReceived//Parsed Documents//Errors//Quote Errors//' +
                      filesErrors[resultsErrors.index("Same")] + '.pdf') 
            print(f"{invoice} Same, replaced with new file in Errors")
            return  
        elif "Same" in resultsErrors and 'Errors'  in invoice:
            return
         
        Move_to_Prev(False, InvoiceNum, invoice)
             
    mydb.close()
                
        
                
        
        