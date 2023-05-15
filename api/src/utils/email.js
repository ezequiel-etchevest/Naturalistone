require('dotenv').config()

// Require:
const postmark = require("postmark");

// Send an email:
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

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
  
  client.sendEmail(optionsEmail);

  return true
}

module.exports = sendEmailUser