# -*- coding: utf-8 -*-
"""
Created on Wed Nov 16 11:25:18 2022

@author: DamianEtchevest
"""
import pandas as pd


import pdfplumber
import re 
from datetime import datetime 
import PyPDF2 
import mysql.connector 

mydb = mysql.connector.connect(
    host="database-1.cfbecwildn3j.us-east-1.rds.amazonaws.com",
    user = "admin",
    password="Ra7878782",
    database= "NaturaliStone",
    port = 3306)  

mycursor = mydb.cursor() 
 
# %% 

df = pd.read_excel('Calls October.xlsx', dtype = {'Date': datetime })
df = df[~df['Rep'].isna()]

for index, row in df.iterrows():  
    
    mycursor.execute(
        ('select CustomerID from Customers ' + 
         'where Reference = \"%s\" ')  % (row['Customer']))
    CustomerID = mycursor.fetchall()
    
    if CustomerID == []:
        sql = ('Insert into Customers (Reference) VALUES (%s)')
        val = [row['Customer']]            
        mycursor.execute(sql, val)
        mydb.commit()
        
        mycursor.execute(
            ('select CustomerID from Customers ' + 
             'where Reference = \"%s\" ')   % (row['Customer']))
        CustomerID = mycursor.fetchall()
    CustomerID = CustomerID[0][0]
         
    mycursor.execute(
        ("select SellerID from Seller " + 
         "where Reference = \'%s\'  ")  % (row['Rep']))
    SellerID = mycursor.fetchall()
     
    mycursor.execute(
        ("select Naturali_Invoice, InvoiceDate from Sales " + 
         "where Naturali_Invoice = %s  ") 
        % (int(row['Num']) ))

        #### Get or insert ProdID, which we need to update ProdOrdered & Inventory.
    if mycursor.fetchall() != []: 
        print( int(row['Num']), 'already exits')
    else: 
        sql = ('Insert into Sales (Naturali_Invoice, Value, CustomerID, ' +
               'InvoiceDate, SellerID) VALUES (%s, %s, %s, %s, %s)')
        val = [int(row['Num']), row['Amount'],CustomerID,
               datetime.fromtimestamp(datetime.timestamp(row['Date'])),
               SellerID[0][0]]
        mycursor.execute(sql, val)
        mydb.commit()
 
mydb.close()


