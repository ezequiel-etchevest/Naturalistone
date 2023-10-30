# -*- coding: utf-8 -*-
"""
Created on Mon Oct 16 12:36:49 2023

@author: DamianEtchevest
"""

import os    
import pandas as pd
import re
from bs4 import BeautifulSoup
import mysql.connector  
import math

os.chdir('C://Users//DamianEtchevest//onedrive - naturalistone.com')

mydb = mysql.connector.connect(
    host="naturalistone.cfbecwildn3j.us-east-1.rds.amazonaws.com",
    user = "admin",
    password="Ra7878782",
    database= "NaturaliStone",
    port = 3306)  

mycursor = mydb.cursor()  
 
mycursor.execute(  'select distinct Email, CustomerID from Customers where Email is not null')
Email_Customers = [Email for Email in mycursor.fetchall() ] 
 
mycursor.execute(  'select  Username, SellerID from Logins ')
Seller = [Seller for Seller in mycursor.fetchall() ] 

mycursor.execute(  "select  * from Customer_Relationship  where Action = 'Email' ")
DB_Emails = [Email for Email in mycursor.fetchall() ] 
 
Emails_Received = pd.read_excel('.\\Emails Received NaturaliStone.xlsx'
                    ).sort_values('Fecha',ascending=[False]).drop_duplicates(['From','Body'])
Emails_Received = Emails_Received.loc[~Emails_Received['Receiver'].isna(), :]


filtered_df = Emails_Received[ Emails_Received['From'].isin([email[0] for email in Email_Customers]) ]
filtered_df = filtered_df[~filtered_df['From'].str.contains('@naturalistone.com')] 

# Create a dictionary to map email addresses to CustomerID
email_to_customer_id = {email[0]: email[1] for email in Email_Customers}
receiver_to_seller_id = {seller[0].lower(): seller[1] for seller in Seller}

# Add the CustomerID column to the filtered_df
filtered_df['CustomerID'] = filtered_df['From'].map(email_to_customer_id)
filtered_df['SellerID'] = filtered_df['Receiver'].map(receiver_to_seller_id) 

 
# Iterate through rows in the filtered_df and insert them into the database
for index, row in filtered_df.iterrows():
    CustomerID = row['CustomerID']
    Action = 'Email'  # Set your desired action
    Sender = row['From']
    Subject = row['Subject'].replace("'",' ')
# =============================================================================
#     EmailBody = row['Body']
#     # Parse the HTML email body using BeautifulSoup
#     soup = BeautifulSoup(EmailBody, 'html.parser')
#     # Extract text content from the parsed HTML
#     email_text = soup.get_text().replace('_x000D_','')
# 
#     try:
#         # Summarize the email content (you can define your own logic here)
#         email_summary = email_text.split('Subject: ')[1].split('\xa0\xa0')[0].replace('\xa0','\n')  # Example: Extract the first 200 characters as a summary
#     except:
#         pass
# =============================================================================
    
    SellerID = None if math.isnan(row['SellerID']) else row['SellerID']  # Set your desired SellerID
    Insert_Date = row['Fecha']  # Set your desired Insert_Date

        
    mycursor.execute( """ select  * from Customer_Relationship  
                     where Action = 'Email' and 
                     CustomerID = %s and Comment = \'%s\' and Insert_Date = \'%s\' """
                     % (CustomerID, Subject,  Insert_Date))
    DB_Emails_Matched = mycursor.fetchall() 
    
    if DB_Emails_Matched == []:  
        # Define the INSERT statement
        insert_query = "INSERT INTO Customer_Relationship (CustomerID, Action, Comment, SellerID, Insert_Date) VALUES (%s, %s, %s, %s, %s)"
        values = (CustomerID, Action, Subject, SellerID, Insert_Date)
    
        # Execute the INSERT statement
        mycursor.execute(insert_query, values)

# Commit the changes to the database
mydb.commit()

# Close the cursor and the database connection
mycursor.close()
mydb.close()