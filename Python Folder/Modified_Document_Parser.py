# %% Setup

import os
import PyPDF2 
import pdfplumber
import shutil
os.environ['KMP_DUPLICATE_LIB_OK'] = 'TRUE'
import io
from google.cloud import vision
import re
import cv2
import numpy as np
from PIL import Image, ImageOps, ImageFilter
import pytesseract
import fitz 

# Instantiates a client
client = vision.ImageAnnotatorClient.from_service_account_json('.\\neat-simplicity-381119-8d213767802d.json')
pytesseract.pytesseract.tesseract_cmd = r'C:\Users\DamianEtchevest\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'

def Replace_file_text(InvoiceNumber:str, 
                      parsed_folder:str, old_folder:str)-> None:
    
    other_file = os.path.join(parsed_folder, InvoiceNumber + '.pdf')
    # If the text is different, move the old file to old_folder 
    # and move the new file to the given folder 
    os.rename(other_file, os.path.join(old_folder, InvoiceNumber + '.pdf'))

def compare_file_text(file_name:str, InvoiceNumber:str,
                      parsed_folder:str,  
                      InvoiceText:str, pdfFileObj)-> None:
    """
    Compare text of the file in the given folder and the file in the other folder.
    If the files have the same text, remove the file from the given folder.
    If the files have different text, move the old file to old_folder and move 
    the new file to the given folder.

    Parameters:
    file_name (str): Name of the file to be compared
    parsed_folder (str): Path to the folder where the other file is located
    old_folder (str): Path to the folder where the old files should be stored

    Returns:
    None

    """
    # Get the full path of the file in the other folder
    other_file = os.path.join(parsed_folder, InvoiceNumber + '.pdf')
    # Check if the file exists in the other folder
    if not os.path.exists(other_file):
        return "New"
    # Open both files and compare their text 
    if 'Order Factory' in file_name :    
        with pdfplumber.open(other_file) as pdf: 
            pages = pdf.pages  
            OtherFileText = '\n'.join([x.extract_text() for x in pages])
    else:
        with pdfplumber.open(other_file) as pdf:
            if len(pdf.pages) == 1:
                page = pdf.pages[0]
                OtherFileText = page.extract_text() 
            else:   
                OtherFileText = ''.join(pdf.pages[i].extract_text() 
                               for i in range(len(pdf.pages)))
            
    if (InvoiceText.split('\n')[:-3] ==  OtherFileText.split('\n')[:-3]): 
        return "Same"
    else: 
        return "Different"

def move_file_with_rename(invoice, InvoiceNum, dst_dir):
    """
    Moves a file to the destination directory while avoiding overwriting an 
    existing file with the same name.
    If a file with the same name already exists in the destination directory, 
    the function renames the file by 
    appending an underscore and a number to the filename until a unique name is found.
    
    Args:
        src_file (str): Path to the source file
        dst_dir (str): Path to the destination directory
        
    Returns:
        str: The path to the moved file in the destination directory.
    """
    InvoiceNum = InvoiceNum.replace('.pdf','')
    
    src_file = os.path.dirname(invoice) + '\\' + InvoiceNum + '.pdf'
    filename = os.path.basename(src_file)
    i = 1
    new_filename = filename
    while os.path.exists(os.path.join(dst_dir, new_filename)):
        # If file with the same name exists in the destination directory
        # append a number to the file name until a unique name is found
        name, ext = os.path.splitext(filename)
        new_filename = f"{name}_{i}{ext}"
        i += 1
    dst_file = os.path.join(dst_dir, new_filename)
    shutil.move(invoice, dst_file)
    return dst_file
 
def dilate_image(image):
    image_array = np.array(image)
    kernel = np.ones((1, 1), np.uint8)
    dilated_image = cv2.dilate(image_array, kernel, iterations=1)
    return Image.fromarray(dilated_image)

def preprocess_image(image):
    # Resize the image
    image = image.resize((image.width * 2, image.height * 2), Image.BICUBIC)
    
    # Convert to grayscale
    image = image.convert("L")
    
    # Apply a threshold
    image = ImageOps.autocontrast(image, cutoff=5)
    
    # Denoise the image using a median filter
    image = image.filter(ImageFilter.MedianFilter(3))
    
    return image

def adaptive_threshold(image):
    image_array = np.array(image)
    threshold_image = cv2.adaptiveThreshold(image_array, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
    return Image.fromarray(threshold_image)

def remove_noise(image):
    image_array = np.array(image)
    kernel = np.ones((1, 1), np.uint8)
    opening = cv2.morphologyEx(image_array, cv2.MORPH_OPEN, kernel)
    closing = cv2.morphologyEx(opening, cv2.MORPH_CLOSE, kernel)
    return Image.fromarray(closing)

def otsu_threshold(image):
    image_array = np.array(image)
    _, threshold_image = cv2.threshold(image_array, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return Image.fromarray(threshold_image)

def get_text_from_image(img, lenguaje = 'eng'):  
      
    # Preprocess the image
    processed_image = preprocess_image(img)
    processed_image = adaptive_threshold(processed_image)
    processed_image = otsu_threshold(processed_image)
    processed_image = remove_noise(processed_image)
    processed_image = dilate_image(processed_image)

    # Apply custom Tesseract configurations
    #config = '--psm 11 --oem 1'  # or try '--psm 11 --oem 1'
    # Apply custom Tesseract configurations
    config = '--psm 6 --oem 1'  #'-c textord_tabfind_find_tables=1'
    text = pytesseract.image_to_string(processed_image, lang= lenguaje, config=config)
    text.strip().split('\n')
    
    return text.strip(), processed_image
 
def extract_text_img(img):
    # Loads the image into memory
    with io.open(img, 'rb') as image_file:
        content = image_file.read()
    
    image = vision.Image(content=content) 
    
    # Performs OCR on the image
    response = client.text_detection(image=image)
    texts = response.text_annotations
    
    # Extract the text from the response and append it to the list
    page_text = ' '.join([text.description for text in texts 
                          if len(text.description) <= 100] ) 
    return page_text

def CropForQuote(img):

    newImg = Image.open(img)
    # Size of the image in pixels (size of original image) 
    width, height = newImg.size
                 
    # Setting the points for cropped image
    left = 450
    top = 0
    right = width
    bottom = height / 4
         
    # Cropped image of above dimension
    # (It will not change original image)
    newImg = newImg.crop((left, top, right, bottom))  
    newImg.save(".\\InvoicesReceived\\Images Converted\\Quote.png")
    
    page_text = extract_text_img(
        ".\\InvoicesReceived\\Images Converted\\Quote.png")
    Quote = [x for x in page_text.split(' ') 
             if (x[0] == '3' or x[0] == '2'  or x[0] == '4') and 
             len(x) == 4 and x.isdigit() and x != '2023' ][0]
    
    return Quote

def CropForSignature(img):

    newImg = Image.open(img)
    # Size of the image in pixels (size of original image) 
    width, height = newImg.size
                 
    # Setting the points for cropped image
    left = 0
    top = 9 * height / 10
    right = width
    bottom = height 
         
    # Cropped image of above dimension
    # (It will not change original image)
    newImg = newImg.crop((left, top, right, bottom))  
    newImg.save(".\\InvoicesReceived\\Images Converted\\Signature.png")
     
    page_text = extract_text_img(
        ".\\InvoicesReceived\\Images Converted\\Signature.png")
    
    # Define the regular expression pattern for non-common words
    noncommon_pattern = r'\b(?!Signature|Print|Name|Date)\w+\b'
    # Find all occurrences of the non-common pattern in the text
    noncommon_words = re.findall(noncommon_pattern, page_text)
    
    # Join the non-common words together with spaces to create the cleaned text
    cleaned_text = ' '.join(noncommon_words)
    
    return cleaned_text

# %% convert_pdf_to_image

def convert_pdf_to_image(file):
          
    # Iterate over each image file and extract text using Google's OCR tool
    extracted_text = [] 
    #open your file
    doc = fitz.open(file)
    # iterate through the pages of the document and create a RGB image of the pge. 
    
    NaturaliFlag2 = False
    for page in doc:   
        NaturaliFlag2 = False
        Quote = ''
        OrderFlag = False
        pix = page.get_pixmap()
        img = ".\\InvoicesReceived\\Images Converted\\page-%i.png" % page.number
        pix.save(img)
        
        page_text = extract_text_img(img)
        
        if (('CREDIT CARD AUTHORIZATION' not in page_text or 
            'TERMS AND CONDITIONS OF SALE' not in page_text) and 
            'www.naturalistone.com' in page_text and 'Quote Number' in page_text):
            
            doc.close()
            Quote = CropForQuote(img)
            Signature = CropForSignature(img)
            if Quote != '':
                NaturaliFlag2 = True  
                os.remove(img)
                os.remove(".\\InvoicesReceived\\Images Converted\\Quote.png")
                os.remove(".\\InvoicesReceived\\Images Converted\\Signature.png")
                
                return NaturaliFlag2, Quote, 'Quote', Signature
            else: 
                NaturaliFlag2 = True  
                os.remove(img)
                return NaturaliFlag2, 0000, 'Quote' 
                
        elif  (all(s in page_text for s in ['info@belottitiles.com',
                                            'Proforma Invoice', 'DATA / DATE']) or 
             all(s in page_text for s in ['info@stone-district.com', 'INVOICE' ]) or 
             all(s in page_text for s in ['coralegnami.it', 'PROFORMA', 'INVOICE' ]) or 
             all(s in page_text for s in ['017086', 'Order Confirmation', 'Tot.Accrediti' ]) or 
             (all(s in page_text for s in ['1101379', 'INVOICE' ]) and 
                  'Stampa Mastrini' not in page_text) or 
             all(s in page_text for s in ['bonotti.com', 'PACKING LIST' ]) or 
             all(s in page_text for s in ['bonotti.com', 'COMMERCIAL INVOICE' ]) or
             all(s in page_text for s in ['Austin','Granite','Direct', 'Purchase Order']) or
             all(s in page_text for s in ['abkgroup.it', 'ORDER CONFIRMATION', 'Item Code']) or
             all(s in page_text for s in ['abkgroup.it', 'ORDER CONFIRMATION', 'Item code']) or
             all(s in page_text for s in ['abkgroup.it', 'INVOICE' ]) or
             all(s in page_text.replace(' ','') for s in ['PETRAANTIQUA', 'PRO-FORMAINVOICE' ]) or
             all(s in page_text.title() for s in ['Ricchetti', 'Invoice' ]) or
             all(s in page_text.title() for s in ['Ricchetti', 'Proforma']) or
             all(s in page_text for s in ['CERDISA', 'INVOICE','Description' ]) or
             all(s in page_text for s in ['FONDOVALLE','Proforma Invoice', 'Codice']) or
             all(s in page_text for s in ['Fondovalle','Proforma Invoice', 'Codice']) or
             all(s in page_text for s in ['FLAVIKER','INVOICE', 'Description']) or
             all(s in page_text for s in ['Domos Srl','PROFORMA']) or
             all(s in page_text for s in ['Domos Srl','Invoice']) or
             all(s in page_text for s in ['info@anticaceramica.it']) or
             all(s in page_text for s in ['www.stonetek.us','Stonetek']) or
             all(s in page_text for s in ['MARMOL EXPORT','Proforma', 'Unit Price']) 
             ):
            doc.close()
            extracted_text.append(page_text)
            OrderFlag = True  
            os.remove(img)
            return OrderFlag, 0000, 'Order' 
        else: 
            os.remove(img)
    doc.close()
        