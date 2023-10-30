# -*- coding: utf-8 -*-
"""
Created on Wed Nov 16 18:25:56 2022

@author: DamianEtchevest
"""

import pandas as pd   
import mysql.connector  

mydb = mysql.connector.connect(
    host="naturalistone.cfbecwildn3j.us-east-1.rds.amazonaws.com",
    user = "admin",
    password="Ra7878782",
    database= "NaturaliStone",
    port = 3306)  

mycursor = mydb.cursor() 
# %% 

mycursor.execute(
     """ select Material, Type, Size, Thickness, FactoryDimension from Dimension  """  )  
DimensionID = mycursor.fetchall()

# create DataFrame using data
df = pd.DataFrame(DimensionID, 
                  columns =['Material', 'Type', 'Size', 
                            'Thickness', 'FactoryDimension']).drop_duplicates()
  
df['Finish'] = 'Antique'
 
# %% 
# df = pd.read_excel(
#      'Pricelist  Terrazzo 2022.xlsx', sheet_name = [0,1,2,3] )

# newdf = pd.DataFrame()
# for i in df:  
#     if 'Slabs' in df[i].columns[0] : 
#         Type = 'Slab' 
#     else: 
#         Type = 'Tile' 
        
#     for index, row in df[i].iterrows(): 
#         ModifiedRow =  re.sub(' ', '', 
#                    row[df[i].columns[1]].replace(
#                        '"','')).replace("''", "") 
#         if len(ModifiedRow.split('x')) == 3:
#             Thickness = ModifiedRow.split('x')[2]
#         else:
#             Thickness = None
#         data = [[Type, 'x'.join(ModifiedRow.split('x')[:2]),
#                  Thickness]]
#         newdf = newdf.append(
#             pd.DataFrame(data, columns = ['Type','Size','Thickness']))
        
# newdf = newdf.drop_duplicates() 
# #newdf['Finish'] = 'Brushed' 


# %% 
# df = pd.read_excel('.\\INVENTORY FILE\\INVENTORY CORRECT.xlsx'
#                    , sheet_name = 'TERRAZZO',
#                    usecols = [0,1,2,3,4,5,6])

# df['Type'] = df['Type'].apply(lambda x: 
#                   x.replace('Terrazo','' ).replace('Terrazzo','' ))

# df['Material'] =  'Terrazo'
# df['Finish'] = ''

# df = df.iloc[:,[0,1,2,3,5,4]]

# %% 

# Convert all values to string
df = df.astype(str)

df['Size'] = df['Size'].str.lower().str.replace(
    r'(?<=\d)(?=[\'"])|(?<=[\'"])(?=\d)', 'x') \
    .str.replace('approx', '') \
    .str.findall(r'\d+\'?\d*').str.join('x') \
    .str.strip('x') \
    .str.replace('xx', 'x') \
    .str.replace('\'', '\'\'') \
    .str.replace('\"', '') \
    .str.replace('\s+', ' ') \
    .str.strip()
 
    
# Iterate over rows in the DataFrame 
for index, row in df.iterrows():
    
    # Clean FactoryName and NaturaliName
    df.at[index, 'FactoryName'] = ' '.join(
        row['FactoryName'].strip().title().replace(' + Finish','')).split()
    df.at[index, 'NaturaliName'] = ' '.join(
        row['NaturaliName'].strip().title()).split()
    
    thickness = row['Thickness'].replace('"', '').replace("'", ''
                              ).replace('approx', '')
    #thickness = ''.join([c for c in thickness if c.isdigit() or c == 'x'])
    thickness = thickness.replace('x', '').replace('11', '1 1').strip()
    if thickness == 'nan': 
        thickness = None 
    df.at[index, 'Thickness'] = thickness
    
    FactorySize = row['FactorySize']    
    if FactorySize != 'nan': 
        FactorySize.replace(' ', '').strip() 
    else: 
        FactorySize = None 
    print(FactorySize)
    df.at[index, 'FactorySize'] = FactorySize  
    
    
# Remove any rows where 'Factory' is null
df['FactorySize'] = df['FactorySize'].str.replace(' ', '').str.strip()
df = df[df['FactoryName'].notna()]

# %% Unique Terrazzo Sizes iMported
df = pd.read_excel('.\\INVENTORY FILE\\INVENTORY CORRECT Damian Changes.xlsx'
                   , sheet_name = 'Unique Sizes')
df['Finish'] = ''

# %% Insert Dimesions 

DimensionsDF = df.loc[ df['Material'] == 'Porcelain',
                      ['Material','Type','Size','Thickness','Finish']].drop_duplicates() 

# Define the finish values
# finish_values = ['Brushed', 'Polished', 'Honed','Sandblasted']  

finish_values = ['Polished', 'Honed','Natural']  

# Create a new dataframe with a new 'Finish' column for each finish value
DimensionsDF = pd.concat([DimensionsDF.assign(Finish=finish) 
                for finish in finish_values], ignore_index=True)


# Iterate over rows in the DataFrame 
for index, row in DimensionsDF.iterrows():
     
    DimensionsDF.at[index, 'Size'] = row['Size'].strip().title().lower()
    DimensionsDF.at[index, 'Thickness'] = row['Thickness'].strip().title() 
 

try: 

    mySql_insert_query = """INSERT ignore INTO Dimension
                            (Material, Type, Size,
                             Thickness, Finish )  
                           VALUES (%s, %s, %s, %s, %s)  """
                           
    mycursor.executemany(mySql_insert_query, 
                         list(DimensionsDF.itertuples(index=False,
                                               name=None)))
    mydb.commit()
    print(mycursor.rowcount, 
          "Record inserted successfully into Laptop table")
    

except mysql.connector.Error as error:
    print("Failed to insert record into MySQL table {}".format(error))
    

Dimensions = list()

for i in range(0,len(DimensionsDF)): 
    mycursor.execute(
         """ select DimensionID from Dimension 
         where 
         Material = \'%s\' and Type = \'%s\' and Size = \'%s\' and 
         Thickness = \'%s\' and Finish = \'%s\' """ % 
         list(DimensionsDF.itertuples(index=False,
                               name=None))[i])  
    DimensionID = mycursor.fetchall()
    
    if DimensionID != []:
        DimensionID = DimensionID[0][0]
    else:
        print(list(DimensionsDF.itertuples(index=False,
                              name=None))[i])
        
    Dimensions.append(DimensionID)
    
# %% Insert Dimesions IN Factory Dimensions Table 
 
df['Naturali_Dimension'] = df['Size'] + 'x' + df['Thickness'] 

DimensionsDF = df.loc[:,['FactoryID','FactorySize','Naturali_Dimension']].drop_duplicates() 

 
# Iterate over rows in the DataFrame 
for index, row in DimensionsDF.iterrows():
     
    DimensionsDF.at[index, 'Naturali_Dimension'] = row['Naturali_Dimension'].strip(
        ).title().replace('Mm','').lower()
    
    try:
        DimensionsDF.at[index, 'FactorySize'] = row['FactorySize'].strip(
            ).title().replace('Cm','').replace('Mm','').lower()
    except: 
        DimensionsDF.at[index, 'FactorySize'] = None
 
try: 

    mySql_insert_query = """INSERT ignore INTO Factory_Dimensions
                            (FactoryID, Factory_Dimension, Naturali_Dimension  )  
                           VALUES (%s, %s, %s )  """
                           
    mycursor.executemany(mySql_insert_query, 
                         list(DimensionsDF.itertuples(index=False,
                                               name=None)))
    mydb.commit()
    print(mycursor.rowcount, 
          "Record inserted successfully into Laptop table")
    

except mysql.connector.Error as error:
    print("Failed to insert record into MySQL table {}".format(error))
    

# %% Insert ProdNames 

# =============================================================================
#                               Terrazos
# ProdNamesDF = df.loc[:,
#          ['FactoryName','Factory','NaturaliName']].drop_duplicates() 
# ProdNamesDF['Factory'] = ProdNamesDF['Factory'].str.replace('Bellotti', '1'
#                          ).str.replace('MarmiScala', '2')
# =============================================================================

df = pd.read_excel('.\\INVENTORY FILE\\INVENTORY CORRECT Damian Changes.xlsx'
                   , sheet_name = 'Porcelain Slab')
ProdNamesDF = df.loc[:,
          ['Factory Name','FactoryID','Naturali Name']].drop_duplicates().rename(
              {'Factory':'FactoryID'})


# Iterate over rows in the DataFrame 
for index, row in ProdNamesDF.iterrows():
    
    # Clean FactoryName and NaturaliName
    ProdNamesDF.at[index, 'Factory Name'] = row['Factory Name'].strip().title()
    try:
        ProdNamesDF.at[index, 'Naturali Name'] = row['Naturali Name'].strip().title()
    except: 
        ProdNamesDF.at[index, 'Naturali Name'] = None
     
try: 

    mySql_insert_query = """INSERT ignore INTO ProdNames
                    (Factory_ProdName,FactoryID, Naturali_ProdName )  
                           VALUES (%s, %s, %s  )  """
                           
    mycursor.executemany(mySql_insert_query, 
                         list(ProdNamesDF.itertuples(index=False,
                                               name=None)))
    mydb.commit()
    print(mycursor.rowcount, 
          "Record inserted successfully into Laptop table")

except mysql.connector.Error as error:
    print("Failed to insert record into MySQL table {}".format(error))
    
     



# %%
finally:
    if mydb.is_connected():
        mycursor.close()
        mydb.close()
        print("MySQL connection is closed")

        
        
    
