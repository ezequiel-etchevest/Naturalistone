// const { ConfidentialClientApplication } = require('@azure/msal-node');
// require('dotenv').config();

// async function getOneDriveAccessToken() {
//     const msalConfig = {
//       auth: {
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         authority: 'https://login.microsoftonline.com/common',
//       },
//     };
  
//     const cca = new ConfidentialClientApplication(msalConfig);
  
//     const authResult = await cca.acquireTokenByClientCredential({
//       scopes: ['https://graph.microsoft.com/.default'],
//     });
  
//     return authResult.accessToken;
//   }

//   module.exports = { getOneDriveAccessToken };

