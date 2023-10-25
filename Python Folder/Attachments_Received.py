 

#from win32com.client import Dispatch 
import pdfplumber  
import Invoice_Orders as Orders
import Invoice_Freights as Freights
import Invoice_Quotes as Quotes
import shutil 
import PyPDF2  
from Modified_Document_Parser import convert_pdf_to_image, move_file_with_rename
import re
from datetime import datetime

def DistributeAttachments(file): 
        
    filename = file.split('\\')[-1]
          
    Remove = False
    try:
        PDFText = PyPDF2.PdfFileReader(file).getPage(0).extractText()
    except:
        Remove = True
        pass
    
    if (Remove or len(PDFText.split('\n')) <= 2 or 
        all(s in PDFText for s in ['\x15','\x17','\x19','\x13'])) :
        try:
            IMGAnalysis = convert_pdf_to_image(file)
        except: 
            shutil.move(file, 
                      './/InvoicesReceived//Parsed Documents//' +
                      'Other Attachments//Unreadable//' + (file.split('\\')[-1] ))
            print("Removed to Unreadable Folder" )
            
        if IMGAnalysis != None and True in IMGAnalysis and IMGAnalysis[2] == 'Quote':   
            move_file_with_rename(file, IMGAnalysis[1], 
                  './/InvoicesReceived//Parsed Documents//Invoice Naturali//Signed Docs//' ) 
            print("Moved to Signed Quotes",  IMGAnalysis[1] ) 
            return 
        elif IMGAnalysis != None and True in IMGAnalysis and 'Order' in IMGAnalysis:   
            shutil.move(file, 
                      './/InvoicesReceived//Order Factory//Unreadable//' + 
                      (file.split('\\')[-1] ))
            print("Moved Unreadable Order Factory" ) 
            return 
        else:   
            shutil.move(file, 
                      './/InvoicesReceived//Parsed Documents//' +
                      'Other Attachments//Unreadable//' + (file.split('\\')[-1] ))
            print("Removed to Unreadable Folder" )
            return 

    
    try:
        with pdfplumber.open(file) as pdf: 
         
            page = pdf.pages[0]
            text = page.extract_text()  
    except:
        text = PDFText
    #return 'finsih process'
        
    if (('GENERAL NOLI' in text or 'General Noli' in text) and 
            ('Tel.+1 718 9959233' in text or 'generalnoli.com' in text or 
            '718 995 9233' in text)) :  
          shutil.move(file, './/InvoicesReceived//Freights//' + filename) 
          return print("Moved to Freights" )
         
    elif '@globaltranz.com' in text: 
          shutil.move(file, 
              './/InvoicesReceived//Parsed Documents//Freights//Global Tranz//' + filename) 
          return print("Moved to Global Tranz" ) 
       
    elif 'YACHB Inc' in text: 
          shutil.move(file, 
              './/InvoicesReceived//Parsed Documents//Freights//YACHB//' + filename) 
          return print("Moved to YACHB" ) 
      
          #Freights.Parse_Freight_Invoice(file)
    elif (all(s in text for s in ['info@belottitiles.com', 'Proforma Invoice', 'DATA / DATE']) or 
          all(s in text for s in ['info@belottitiles.com', 'INVOICE' ]) or 
          all(s in text for s in ['info@stone-district.com', 'INVOICE' ]) or 
          all(s in text for s in ['coralegnami.it', 'PROFORMA' ]) or 
          all(s in text for s in ['coralegnami.it' , 'INVOICE' ]) or 
          all(s in text for s in ['017086', 'Order Confirmation', 'Tot.Accrediti' ]) or 
          (all(s in text for s in ['1101379', 'INVOICE' ]) and 
              'Stampa Mastrini' not in text) or 
          'PACKING LIST' in text or
          'bonotti.com' in text or # Bonotti
          all(s in text for s in ['STONE TRADING INTERNATIONAL', 'PACKING LIST' ]) or # Bonotti
          all(s in text for s in ['STONE TRADING INTERNATIONAL' , 'COMMERCIAL INVOICE' ]) or # Bonotti
          all(s in text for s in ['Austin','Granite','Direct' ]) or
          all(s in text for s in ['abkgroup.it', 'ORDER CONFIRMATION', 'Item Code']) or
          all(s in text for s in ['abkgroup.it', 'ORDER CONFIRMATION', 'Item code']) or
          all(s in text.replace(' ','') for s in ['PETRAANTIQUA'  ]) or
          all(s in text.title() for s in ['Ricchetti', 'Invoice' ]) or
          all(s in text.title() for s in ['Ricchetti', 'Proforma']) or
          all(s in text for s in ['CERDISA', 'INVOICE','Description' ]) or
          all(s in text for s in ['FONDOVALLE','Invoice']) or
          all(s in text for s in ['Fondovalle','Invoice']) or
          all(s in text for s in ['FONDOVALLE','Proforma']) or
          all(s in text for s in ['Fondovalle','Proforma']) or
          all(s in text for s in ['FLAVIKER','INVOICE', 'Description']) or
          any(s in text for s in ['ABK Group','abkgroup.it']) or
          all(s in text for s in ['Domos Srl' ]) or
          any(s in text for s in ['@stonebroker', 'STONE BROKER OF AMERICA' ]) or
          all(s in text for s in ['info@anticaceramica.it']) or
          all(s in text for s in ['www.stonetek.us','Stonetek']) or
          all(s in text for s in ['MARMOL EXPORT',  'Unit Price']) or
          all(s in text for s in [  'ITIBA4N2 CCIN 05A0B3I4']) or
          all(s in text for s in ['UMI, LLC' ]) or 
          all(s in text for s in ['KERABEN' ]) or 
          all(s in text for s in ['Tax ID # 20-5340381','Purchase Order']) or
          any(s in text for s in ['Coraldom USA','Mosaic Solutions & More','stone access inc']) or
          'SUKABUMI S.L' in text ): 
        
        shutil.move(file, './/InvoicesReceived//Order Factory//' + filename)
        return print("Moved to Factory Order" )
          # Orders.Parse_Factory_Invoice(Attachment)  
            
    elif all(s in text for s in ['1101379', 'INVOICE' ]): 
        shutil.move(file, 
                  './/InvoicesReceived//Parsed Documents//' +
                  'Other Attachments//Order Factory Errors//' + filename)
        return print("Removed to Other Attachments -  Order Factory Errors" )  
        
    elif (all(s in text for s in ['orders@naturalistone.com','Quote Number'])
          and 'CREDIT CARD AUTHORIZATION' not in text and 
          'DocuSign Envelope' not in text): 
        IMGAnalysis = convert_pdf_to_image(file)
        if ((IMGAnalysis[3] != '' or str(datetime.now().year) in IMGAnalysis[3]) and 
            IMGAnalysis[3] != 'Page 1 Page 1'):
            move_file_with_rename(file, IMGAnalysis[1], 
                  './/InvoicesReceived//Parsed Documents//Invoice Naturali//Signed Docs//' ) 
            return print("Moved to Signed Quotes",  IMGAnalysis[1] ) 
        else:
            Quotes.Parse_Quotes_Invoice(file)
        
    elif (all(s in text for s in ['www.naturalistone.com','Invoice #'])
          and 'CREDIT CARD AUTHORIZATION' not in text and 
          'DocuSign Envelope' not in text and 
          'Thank you for your business.' in text): 
        shutil.move(file, 
                  './/InvoicesReceived//Parsed Documents//' +
                  'Other Attachments//Invoices//' + filename)
        return print("Removed to Other Attachments-  Invoices" )
                
    else:   
        shutil.move(file, 
                  './/InvoicesReceived//Parsed Documents//' +
                  'Other Attachments//' + filename )   
        return print("Removed to Other Attachments" )
            

'''
outlook = Dispatch("Outlook.Application").GetNamespace("MAPI")
inbox = outlook.GetDefaultFolder("6")
#your_folder = outlook.Folders['asaif.butt@lakeview.com'].Folders['Inbox'].Folders['Subservicers']
your_folder = outlook.Folders['Damian.Etchevest@lakeview.com'].Folders[
    'Inbox'].Folders['Naturali']

for message in your_folder.Items: 
    rec_time = message.CreationTime.date()
    att = message.Attachments
    
    for att in message.Attachments:
        if '.pdf' in att.FileName:
            att.SaveAsFile(os.getcwd() + "\\"+ str(att.FileName))
            print(str(att.FileName))
'''