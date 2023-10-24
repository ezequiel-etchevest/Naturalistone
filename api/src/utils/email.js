require('dotenv').config();
const fs = require('fs')
const postmark = require("postmark");
const path = require('path')
const htmlToText = require('html-to-text');
 
// Send an email:
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
const companyName = 'Naturalistone';
const companyAddress = '261 NW 71st St, Miami, FL 33150, United States';
// const imgPath = path.join(__dirname, 'http://localhost:3000/static/media/NaturalistoneLogo.eb5d8e3f95f6979dfe9b.png'); // Ajusta el nombre del archivo y la ruta según sea necesario
// const file = fs.readFileSync(imgPath);


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
  fromEmail,
  clientEmail,
  ccEmail,
	body_Value,
  subject_value,
  filePdf,
) {
  const optionsEmail = {
    From: fromEmail,
    To: clientEmail,
    Cc: ccEmail,
    TemplateId: 32024830,
    attachments: [
      { 
       Name: 'Invoice',
       Content: filePdf,
       ContentType: 'application/pdf'
     },
    ],
    TemplateModel: {
      subject: subject_value,
      body: body_Value,
      company_name: companyName,
      company_address: companyAddress,
      image: imageNaturaliStone,
      imageSignature: imageSignature
    }
  }

  return client.sendEmailWithTemplate(optionsEmail)
}

function sendSamplesEmail( fromEmail, clientEmail, ccEmail, bodyValue, subjectValue, attachments, seller ) {
 
  if (seller === 'sales') {
    seller = 'german';
  }
  var imageSignature = `https://naturali-parseddocuments.s3.amazonaws.com/Invoice+Naturali/assets/${seller}.png`
  
  const optionsEmail = {
    From: fromEmail,
    To: clientEmail,
    Cc: ccEmail,
    TemplateId: 31786965,
    TemplateModel: {
      subject: subjectValue,
      HtmlBody: bodyValue, // Aquí puedes poner el contenido HTML
      company_name: companyName,
      company_address: companyAddress,
      image: 'https://naturali-parseddocuments.s3.amazonaws.com/Invoice+Naturali/assets/NaturalistoneLogo.png',
      imageSignature: imageSignature
    }
  };
    // Manejar archivos adjuntos
    if (attachments && attachments.length > 0) {
      optionsEmail.Attachments = [];
    
      attachments.forEach((attachment) => {
        console.log(attachment)
        // if (attachment.buffer) { // Asegúrate de que el campo buffer esté presente
          // const fileContent = attachment.buffer.toString('base64');
          optionsEmail.Attachments.push({
            Name: attachment.originalname,
            Content: attachment.buffer.toString('base64'),
            ContentType: attachment.mimetype,
          });
        // } else {
        //   console.log('Attachment buffer not found for:', attachment.originalname);
        // }
      });
    }
  return client.sendEmailWithTemplate(optionsEmail)
}

module.exports = { sendInvoiceEmail, sendEmailClient, sendEmailUser, sendSamplesEmail }