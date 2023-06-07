require('dotenv').config();
const fs = require('fs')
const postmark = require("postmark");
const path = require('path')

 
// Send an email:
const imageNaturaliStone = 'https://drive.google.com/uc?id=1EpYJ-SvGsqGsDVwjRGYO16oZlVea0KDU'
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
const companyName = 'NaturaliStone';
const companyAddress = '261 NW 71st St, Miami, FL 33150, United States';
const fromEmail = "irina@naturalistone.com"
const imgDrive = 'https://netorg8591642-my.sharepoint.com/:i:/g/personal/irina_naturalistone_com/EUJMsPLT2jBLokqZ-cz1SVMBijZhI9_At-atEYcxV48L7Q?e=46P25n'

const imgPath = path.join(__dirname, '../pictures/NaturalistoneLogo.png'); // Ajusta el nombre del archivo y la ruta según sea necesario
const file = fs.readFileSync(imgPath);


function sendEmailUser() {
  const optionsEmail= {
    "From": fromEmail,
    "To": "eduardo@avilatek.dev",
    "Subject": "Hello from Postmark",
    "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
    "TextBody": "Hello from Postmark!",
    "MessageStream": "outbound"
  }
  
  return client.sendEmail(optionsEmail);
}

function sendInvoiceEmail(
  clientEmail,
  name_value,
  invoiceId,
  // naturali_Invoice,
  invoice_details,
  description,
  amount_value,
  total_value,
  date,
  ) {
  const optionsEmail = {
    From: fromEmail,
    To: clientEmail,
    TemplateId: 31786965,
    attachments: [
      { 
       Name: 'archivo.pdf',
       Content: file,
       ContentType: 'application/pdf'
     }
     ],
    TemplateModel: {
      product_name: companyName,
      name: name_value, // "name_value"
      image: imageNaturaliStone,
      invoice_id: invoiceId,
      date: date,
      invoice_details: [ //array for products
        {
          description: description, // description_value name products
          amount: amount_value // "amount_value" amount products
        }
      ],
      total: total_value, // total value for products
      company_name: companyName,
      company_address: companyAddress,
    }
  }
  return client.sendEmailWithTemplate(optionsEmail);
}

function sendEmailClient(
  name_value,
  clientEmail,
	body_Value,
  subject_value,
  filePdf,
) {
  const optionsEmail = {
    From: fromEmail,
    To: clientEmail,
    TemplateId: 32024830,
    attachments: [
      { 
       Name: 'Invoice',
       Content: filePdf,
       ContentType: 'application/pdf'
     },
    ],
    TemplateModel: {
      name: name_value,
      product_name: companyName,
      body: body_Value,
      company_name: companyName,
      company_address: companyAddress,
      // image: otra,
      subject: subject_value,
    }
  }

  return client.sendEmailWithTemplate(optionsEmail)
}

module.exports = { sendInvoiceEmail, sendEmailClient, sendEmailUser }