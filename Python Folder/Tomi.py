# -*- coding: utf-8 -*-
"""
Created on Mon Nov 15 12:05:08 2021

@author: DamianEtchevest
"""


from selenium import webdriver
import os
from multiprocessing.dummy import Pool as ThreadPool 
import pandas as pd
import time

df = pd.DataFrame()

driver = webdriver.Chrome(".\\chromedriver_win32\\chromedriver.exe")
driver.get('https://bettina-yuchimczuk-chrt.squarespace.com/products')
lnks = driver.find_element_by_xpath('//div[@class="row sqs-row"]').find_elements_by_tag_name("a")

Types = []
urlsTypes = [] 
collections = []
# traverse list
for lnk in lnks:
    Types.append(lnk.get_attribute('href')[48:])
    print(lnk.get_attribute('href')[48:])

driver.quit()

df.loc[:,'Types'] = Types



# %% 
def lala(Type):
    df = pd.DataFrame()

    
    driver = webdriver.Chrome(".\\chromedriver_win32\\chromedriver.exe")    
    driver.get('https://bettina-yuchimczuk-chrt.squarespace.com/' + Type)
    lnks2 = driver.find_element_by_xpath('//div[@class="row sqs-row"]').find_elements_by_tag_name("a")
    try:  
        try:
            lnks2 = driver.find_element_by_xpath('//div[@class="row sqs-row"][2]').find_elements_by_tag_name("a")
        except: 
            lnks2 =  driver.find_element_by_xpath('//*[@class="col sqs-col-12 span-12"]').find_elements_by_tag_name("a")
        collectionUrls = []
        for lnk2 in range(0,len(lnks2)): collectionUrls.append(lnks2[lnk2].get_attribute('href'))
        
        #lnk2 = lnks2[1]
        for lnk2 in collectionUrls:
            if ('products' in lnk2) & (len(lnks2) == 1):  
                lnks3 = driver.find_element_by_xpath('//*[@class="ProductList-grid clear"]').find_elements_by_tag_name("a")
                prodsUrls = []
                for lnk3 in range(0,len(lnks3)): prodsUrls.append(lnks3[lnk3].get_attribute('href'))
                
                for url in prodsUrls: 
                     
                    driver.get(url)
                    collection = ''
                    prod = url[url.find('/',48) + 1:].replace('-',' ').title()
                    txt = driver.find_element_by_xpath('//*[@class="sqs-block-content"][1]').text 
                    Specs = txt.split('\n')
                    
                    
                    dfCorrections = pd.DataFrame( {'Types':  Type,
                                                   'Collections': collection,
                                                   'Prods': [prod]})
    
                    for SpecIndex in range(0,len(Specs)): 
                        if (':' not in Specs[SpecIndex]): 
                            pass
                        elif ('Size' in Specs[SpecIndex][:4]): 
                            Sizes = [] 
                            for l in Specs[SpecIndex].split(':')[1].replace('&',',').replace('-',',').split(','): 
                                Sizes.append(l.strip())
                            dfCorrections['Size'] = [Sizes]
                        else:
                            Field = Specs[SpecIndex].split(':')[0].replace(' ','_')
                            FieldList = []    
                            for q in Specs[SpecIndex].split(':')[1].replace('&',',').replace('-',',').split(','): 
                                FieldList.append(q.strip())
                            dfCorrections[Field] = [FieldList]
                    order = []
                    for i in dfCorrections.iloc[:,3:]: order.append(len(dfCorrections.loc[0,i]))
                    order.sort() 
                    for index in order:
                        for i in range(3,len(dfCorrections.columns)): 
                            if len(dfCorrections.iloc[0,i]) == index: #print(index,df.columns[i])
                                dfCorrections = dfCorrections.explode(dfCorrections.columns[i])
                    df = df.append(dfCorrections)
                for field in df.columns[:2]: print(pd.Series(df[field]).unique())
                    ## time.sleep(2)'''
                    
            elif 'products' in lnk2:
                pass # product from title
            else: 
                driver.get(lnk2)
                lnks3 = driver.find_element_by_xpath('//*[@class="ProductList-grid clear"]').find_elements_by_tag_name("a")
                prodsUrls = []
                for lnk3 in range(0,len(lnks3)): prodsUrls.append(lnks3[lnk3].get_attribute('href'))
                
                for url in prodsUrls: 
                    driver.get(url)
                    collection = url[48:url.find('/',48)]
                    prod = url[url.find('/',48) + 1:]
                    txt = driver.find_element_by_xpath('//*[@class="sqs-block-content"][1]').text 
                    Specs = txt.split('\n')
                    
                    
                    dfCorrections = pd.DataFrame( {'Types':  Type,
                                                   'Collections': collection,
                                                   'Prods': [prod]})
    
                    for SpecIndex in range(0,len(Specs)): 
                        if (':' not in Specs[SpecIndex]): 
                            pass
                        elif ('Size' in Specs[SpecIndex][:4]): 
                            Sizes = [] 
                            for l in Specs[SpecIndex].split(':')[1].replace('&',',').replace('-',',').split(','): 
                                Sizes.append(l.strip())
                            dfCorrections['Size'] = [Sizes]
                        else:
                            Field = Specs[SpecIndex].split(':')[0].replace(' ','_')
                            FieldList = []    
                            for q in Specs[SpecIndex].split(':')[1].replace('&',',').replace('-',',').split(','): 
                                FieldList.append(q.strip())
                            dfCorrections[Field] = [FieldList]
                    order = []
                    for i in dfCorrections.iloc[:,3:]: order.append(len(dfCorrections.loc[0,i]))
                    order.sort() 
                    for index in order:
                        for i in range(3,len(dfCorrections.columns)): 
                            if len(dfCorrections.iloc[0,i]) == index: #print(index,df.columns[i])
                                dfCorrections = dfCorrections.explode(dfCorrections.columns[i])
                    df = df.append(dfCorrections)
                for field in df.columns[:2]: print(pd.Series(df[field]).unique())
                    ## time.sleep(2)'''
                    
    except: 
        pass
    
    driver.quit()
    return df

   
# %% 

pool = ThreadPool(10) 

start = time.time()
# Start processes in the pool

Main = pd.DataFrame()

results = pool.map(lala, Types)

# Concat dataframes to one dataframe
Main = Main.append(results, ignore_index=True)
end = time.time()


Main.to_csv(os.getcwd() + '\\Tomi.csv')


# %% 
import os
import requests
from urllib.parse import urlparse, parse_qs

def download_image(url, save_path):
    response = requests.get(url, verify=False)
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            f.write(response.content)

def filter_highest_format(urls):
    unique_images = {}
    
    for url in urls:
        parsed_url = urlparse(url)
        query_params = parse_qs(parsed_url.query)
        format_value = int(query_params.get('format', ['0'])[0].rstrip('w'))
        
        image_id = parsed_url.path
        if image_id not in unique_images or format_value > unique_images[image_id]['format']:
            unique_images[image_id] = {'url': url, 'format': format_value}
    
    return [image['url'] for image in unique_images.values()]

def save_images_to_folder(image_dict, Type):
    downloads_folder = os.path.join(os.getcwd(), 'PHOTOS',Type )
    
    for prod_name, urls in image_dict.items():
        folder_path = os.path.join(downloads_folder, prod_name)
        os.makedirs(folder_path, exist_ok=True)
        
        unique_urls = filter_highest_format(urls)
        
        for idx, url in enumerate(unique_urls):
            file_name = f"{prod_name}_{idx}.jpg"
            save_path = os.path.join(folder_path, file_name)
            download_image(url, save_path)
 
    
import warnings
warnings.filterwarnings("ignore")

def ExtractImages(Type):
       
    driver = webdriver.Chrome(".\\chromedriver_win32\\chromedriver.exe")    
    driver.get('https://bettina-yuchimczuk-chrt.squarespace.com/' + Type)
    lnks2 = driver.find_element_by_xpath('//div[@class="row sqs-row"]').find_elements_by_tag_name("a") 
    try:
        lnks2 = driver.find_element_by_xpath('//div[@class="row sqs-row"][2]').find_elements_by_tag_name("a")
    except: 
        lnks2 =  driver.find_element_by_xpath('//*[@class="col sqs-col-12 span-12"]').find_elements_by_tag_name("a")
    collectionUrls = []
    for lnk2 in range(0,len(lnks2)): collectionUrls.append(lnks2[lnk2].get_attribute('href'))

    #lnk2 = lnks2[1]
    for lnk2 in collectionUrls:
        try:
            if ('products' in lnk2) & (len(lnks2) == 1):  
                lnks3 = driver.find_element_by_xpath('//*[@class="ProductList-grid clear"]').find_elements_by_tag_name("a")
                prodsUrls = []
                for lnk3 in range(0,len(lnks3)): 
                    prodsUrls.append(lnks3[lnk3].get_attribute('href'))
            else: 
                 driver.get(lnk2)
                 lnks3 = driver.find_element_by_xpath('//*[@class="ProductList-grid clear"]').find_elements_by_tag_name("a")
                 prodsUrls = []
                 for lnk3 in range(0,len(lnks3)): prodsUrls.append(lnks3[lnk3].get_attribute('href'))
                 
            
            for url in prodsUrls: 
                driver.get(url)
                time.sleep(3)
                prod = url[url.find('/',48) + 1:].replace('-',' ').title()
                image_dict = {
                    prod: [x.get_attribute('src') for x in 
                           driver.find_elements_by_tag_name("img")[2:]] } 
                save_images_to_folder(image_dict, Type.replace('-',' ').title()) 
            print(lnk2.split('com/')[1], "Success")
            
        except:
            print(lnk2.split('com/')[1],"Failed")
            pass 

# %% 

import os
import shutil

root_folder = "/PHOTOS/Porcelain"  # put the root folder path here
 
directories = [name for name in os.listdir(os.getcwd()) if os.path.isdir(os.path.join(os.getcwd(), name))] 
 
for dirname in directories:
    if "Porcelain" in dirname:
        print(dirname)
        new_dirname = dirname.replace("Porcelain", "").strip()
        old_folder_path = os.path.join(os.getcwd(), dirname)
        new_folder_path = os.path.join(os.getcwd(), new_dirname)
        shutil.move(old_folder_path, new_folder_path)  # Rename the directory

directories = [name for name in os.listdir(os.getcwd()) if os.path.isdir(os.path.join(os.getcwd(), name))] 

for dirname in directories:
    if "Paver" in dirname:
        print(dirname)
        new_dirname = dirname.replace("Paver", "").strip()
        old_folder_path = os.path.join(os.getcwd(), dirname)
        new_folder_path = os.path.join(os.getcwd(), new_dirname)
        shutil.move(old_folder_path, new_folder_path)  # Rename the directory
         
        

