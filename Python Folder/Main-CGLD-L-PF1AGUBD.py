
import os 
os.chdir('C://Users//DamianEtchevest//onedrive - naturalistone.com//Naturali')

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler 
import Invoice_Quotes as Quotes
import Invoice_Orders as Orders
import Invoice_Freights as Freights
import Attachments_Received as Att  
import glob
import re
import shutil

# %% 

modifiedEvents = list()
class FileModifiedHandler(FileSystemEventHandler):
    
    def on_created(self, event):  
            
        if  ('.\\InvoicesReceived\\' in event.src_path and
             '.pdf' in event.src_path  and
                event.src_path not in modifiedEvents):
            
            print("Created: " + event.src_path)
            Att.DistributeAttachments(event.src_path) 
            print("Finish: " + event.src_path)
            modifiedEvents.append(event.src_path) 
 

if __name__ == "__main__":

    event_handler = FileModifiedHandler()

    # Create an observer.
    observer = Observer()

    # Attach the observer to the event handler.
    observer.schedule(event_handler, ".", recursive=True)
    
    # Start the observer.
    observer.start()

    try:
        while observer.is_alive():
            observer.join(1)
    finally:
        observer.stop()
        observer.join() 
        
# %% Batch Run  

for folder in os.listdir('.\\InvoicesReceived')[:-2]:  
    list_of_files = filter( os.path.isfile,
                            glob.glob('.\\InvoicesReceived\\' + folder + '\\' + '*') ) 
    list_of_files = sorted( list_of_files,
                            key = os.path.getmtime)
    
    for file in list_of_files: 
        if '.jpg' in file:
            print('\n', file)
            shutil.move(file, 
                      './/InvoicesReceived//Parsed Documents//' +
                      'Other Attachments//Unreadable//' + (file.split('\\')[-1] ))
            print("Removed to Unreadable Folder" ) 
        elif folder =='All Attachments Received' or folder == 'Invoice Naturali': 
            print('\n', file)
            Att.DistributeAttachments( file) 
        # elif folder == 'Freights':
        #     print('\n', file)
        #     Freights.Parse_Freight_Invoice( file)  
        elif folder == 'Order Factory':
            print('\n', file)
            Orders.Parse_Factory_Invoice( file)  
            
# %%  Batch Run Other Attachments 

list_of_files = filter( os.path.isfile,
           glob.glob('.\\InvoicesReceived\\Parsed Documents\\Other Attachments\\' + '*') ) 
list_of_files = sorted( list_of_files,
                        key = os.path.getmtime)

for file in list_of_files : 
     print('\n', file)
     Att.DistributeAttachments( file) 
             
# %%  Batch Run Quote Errors 

def get_latest_file(base_name, ddd="."):
    files = os.listdir(ddd)
    base_files = []
    
    for file in files:
        if file.startswith(base_name):
            base_files.append(file)
    
    if len(base_files) > 1:
        maxNumber_File = max([int(re.findall("[0-9]",x.split('_')[1])[0]) 
         for x in base_files if '_' in x ])  
        latest_file =  f"{base_name}_{maxNumber_File}.pdf" 
        return latest_file
    
    elif len(base_files) == 1:
        return base_files[0]
    else:
        return None 
    
directoryErrors = '.\\InvoicesReceived\\Parsed Documents\\Errors\\Quote Errors\\'
list_of_files = filter( os.path.isfile,
   glob.glob(directoryErrors + '*')) 
list_of_files = sorted( list_of_files,
                        key = os.path.getmtime)
 
# directory = '.\\InvoicesReceived\\Parsed Documents\\Modifications (Prev Version)\\'
# list_of_Parsed_files = filter( os.path.isfile,
#    glob.glob(directory + '*')) 
# list_of_Parsed_files = sorted( list_of_Parsed_files,
#                         key = os.path.getmtime)
# list_of_Parsed_files = [filename.split('\\')[-1].split('.pdf')[0]
#                         for filename in list_of_Parsed_files]

# InParsed = []
# toParse = []

for file in list_of_files: 
     if '10047284' not in file and '_' not in file : 
         latest_file = ( '\\'.join(file.split('\\')[:-1]) + '\\' + 
                        get_latest_file(file.split('\\')[-1].split('.pdf')[0], 
                                        directoryErrors))
         
         newPath = ('.//InvoicesReceived//Invoice Naturali//' + 
            (latest_file.split('\\')[-1].split('_')[0] )).replace('//','\\')
         
         shutil.move(latest_file, newPath)
         print('\n', newPath)
         Quotes.Parse_Quotes_Invoice( newPath)  
         
         # if latest_file.split('\\')[-1].split('.pdf')[0] in list_of_Parsed_files:
         #     InParsed.append(latest_file)
         # else: 
         #     toParse.append(latest_file)
             
   
