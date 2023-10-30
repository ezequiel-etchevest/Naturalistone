# -*- coding: utf-8 -*-
"""
Created on Tue Nov 15 15:08:40 2022

@author: DamianEtchevest
"""
 
import re 
import mysql.connector 
import pandas as pd 
         
mydb = mysql.connector.connect(
    host="naturalistone.cfbecwildn3j.us-east-1.rds.amazonaws.com",
    user = "admin",
    password="Ra7878782",
    database= "NaturaliStone",
    port = 3306)  

mycursor = mydb.cursor()


# %% Terrazos From Bettinas File
newdf = pd.DataFrame()
Factories = {'Belotti': 1,'Marmi':2}
for Factory in Factories:  
    df = pd.read_excel(
        'Terrazzo Bellotti- Marmi Scala Names 2022.xlsx',
        sheet_name = Factories[Factory] - 1)
    
    df = df.iloc[:,:2].append(
        df.iloc[:,2:].rename(columns = {
            df.columns[2] : df.columns[0] ,
            df.columns[3] : df.columns[1]})) 
      
    for x in df.columns: 
        df[x] = df[x].astype(str).str.rstrip().str.title()  
      
    for index, row in df.iterrows(): 
     
        if  row['Naturali Name'] != 'Nan':   
            ProdCode = re.sub('-',' ',re.sub(' +', ' ', 
                                             row['Product Code']))
            ProdName = re.sub('-',' ',re.sub(' +', ' ', 
                                             row['Naturali Name'])) 
            data = [[ProdName,ProdCode,Factories[Factory]]]
            newdf = newdf.append(
                pd.DataFrame(data,
                             columns = ['ProdName',
                                        'ProdCode',
                                        'Factory'])) 

newdf = newdf.drop_duplicates()              
        
   


# %% From Scrapped website

ScrappedDF = pd.read_csv('.\\Scrapped Naturali Products - Cleaned.csv')
ScrappedDF['Custom'] = ScrappedDF['Custom'].apply(lambda x: x.rstrip('s'))
ScrappedDF = ScrappedDF.iloc[:,[1,0]]

# %% 
try: 

    mySql_insert_query = """insert ignore into ProdNames 
                            (Naturali_ProdName, Material)  
                           VALUES (%s, %s)  """
                           
    mycursor.executemany(mySql_insert_query, 
                         list(ScrappedDF.itertuples(index=False,
                                               name=None)))
    mydb.commit()
    print(mycursor.rowcount, 
          "Record inserted successfully into Laptop table")

except mysql.connector.Error as error:
    print("Failed to insert record into MySQL table {}".format(error))

finally:
    if mydb.is_connected():
        mycursor.close()
        mydb.close()
        print("MySQL connection is closed")
        
          
