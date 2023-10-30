# -*- coding: utf-8 -*-
"""
Created on Tue Nov  1 11:51:18 2022

@author: DamianEtchevest
"""
# %% Setup
#from selenium.webdriver.common.keys import Keys
from selenium import webdriver 
from selenium.webdriver.common.by import By
import time 
import numpy as np
#from multiprocessing import Pool
from threading import Thread
urls = ['https://bettina-yuchimczuk-chrt.squarespace.com/config/commerce/inventory'] 
from selenium.webdriver.common.keys import Keys
 
# %%  

def process(PageNumber):
    stopper = False
    
    driver = webdriver.Chrome( 
            executable_path = 
            "C://Users//DamianEtchevest//Downloads//chromedriver.exe")
    driver.get(urls[0]) 
    time.sleep(10)
    driver.find_element(By.XPATH, '//input[@type="email"]').send_keys(
        'bettina@naturalistone.com') 
    driver.find_element(By.XPATH, '//input[@placeholder="Password"]').send_keys(
        'Boutique#5952')
    
    driver.find_element(By.XPATH, '//button[@data-test="login-button"]').click()
    time.sleep(15)
    
    count = 1
    while stopper == False: 
        try:  
            driver.find_element(By.XPATH, '//div[@class="css-1j096s0"]').click()
            time.sleep(3)
            
            while int(driver.find_element(By.XPATH, 
                        '//*[@id="inventory-table"]/tbody' + 
                        '/tr[51]/td/div/div[2]/p').text.split(' ')[0]) != PageNumber : 
                driver.find_element(By.XPATH, '//*[@id="inventory-table"]/tbody/tr[51]' + 
                                             '/td/div/div[2]/button[2]/span').click()
                time.sleep(3)
            
            #lnks = driver.find_elements_by_xpath(
             #   '//tr[@data-test="inventory-panel-row"]/td[3]/div/div/img')
            for element in range(count,51):   
                print('Processing', element,'Page', PageNumber)
                #lnks[i].click()
                driver.find_element(By.XPATH, '//*[@id="inventory-table"]/tbody/tr['+ 
                                             str(element) +
                                             ']/td[3]/div/div/img').click()
                time.sleep(3)
                  
                driver.find_element(By.XPATH,
                                    '//div[@data-anchor="checkout"]/div/div/' + 
                                    'div[1]/div/div[1]').click()
                time.sleep(2)
                
                try: 
                    driver.find_element(By.XPATH, '//div[@class="ANsQmvVRondV5DKN1UPg"]').text 
                except: 
                    driver.find_element(By.XPATH, '/html/body/div[19]/div[3]/div/div[2]/' + 
                                                 'div[2]/div/div/div[3]/label/div/div[2]'+ 
                                                 '/label/input').click()
                    time.sleep(1)
                driver.find_element(By.XPATH, 
                    '//div[@class="ANsQmvVRondV5DKN1UPg"]/textarea').send_keys(Keys.CONTROL + "a")
                driver.find_element(By.XPATH, 
                    '//div[@class="ANsQmvVRondV5DKN1UPg"]/textarea').send_keys(Keys.DELETE)
                
                driver.find_element(By.XPATH, 
                    '//div[@class="ANsQmvVRondV5DKN1UPg"]/textarea').send_keys('Request Sample')
                
                driver.find_element(By.XPATH, '/html/body/div[19]/div[3]/div/div[2]' + 
                                             '/div[2]/div/div/div[1]/div[3]/button').click() 
                try:
                    driver.find_element(By.XPATH, 
                        '//button[@data-testid="pc-save-button"]').click()
                    time.sleep(5)
                except:
                    #driver.find_element(By.XPATH, '/html/body/div[15]/div[3]/div/div[2]/div' + 
                     #                            '[2]/div/div/div[1]/div/div/div/div[3]/ul/' + 
                      #                           'li[4]/div/button').click()    
                    
                    #driver.find_element(By.XPATH, '/html/body/div[19]/div/div/div/div/span[1]').click()
                    driver.find_element(By.XPATH, 
                        '//button[@data-testid="pc-cancel-button"]').click()
                    time.sleep(5)
                count += 1
            stopper = True
        except :
            print('Failed Page', PageNumber )
            driver.refresh()
            time.sleep(10)
            pass
        
            
# %% 
for x in np.arange(1,18,5):
    threads = []
    for page in range(x,x + 5):
        if page <= 17 and x > 15:
            threads.append(Thread(target = process, 
                                  kwargs = {'PageNumber' : page})) 
            
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()    
        