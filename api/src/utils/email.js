require('dotenv').config()

// Require:
const postmark = require("postmark");

// Send an email:
const client = new postmark.ServerClient('043e1617-818c-4162-894d-f10450b7fa63' );

const fromEmail = "eduardo@avilatek.dev"

function sendEmailUser() {
  const optionsEmail= {
    "From": fromEmail,
    "To": "eduardo@avilatek.dev",
    "Subject": "Hello from Postmark",
    "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
    "TextBody": "Hello from Postmark!",
    "MessageStream": "outbound"
  }

  console.log('emal2', optionsEmail)
  console.log('soy client', client)
  client.sendEmail(optionsEmail);

  return 'prueba'
}

module.exports = sendEmailUser