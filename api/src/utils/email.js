require('dotenv').config();

// Require:
const postmark = require("postmark");
 
// Send an email:
const imageNaturaliStone = 'https://drive.google.com/uc?id=1EpYJ-SvGsqGsDVwjRGYO16oZlVea0KDU'
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
const companyName = 'NaturaliStone';
const companyAddress = '261 NW 71st St, Miami, FL 33150, United States';
const fromEmail = "irina@naturalistone.com"

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

module.exports = { sendInvoiceEmail }