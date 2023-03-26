const msal = require('@azure/msal-node');
const { Client } = require('@microsoft/microsoft-graph-client');

const express = require('express')
const onedriveRouter = express.Router()

const clientId = '6de13184-fa81-480d-9344-974ebdda8c8d';
const tenantId = '75bea6a2-28af-477a-b5bc-a809620fcb6a';
const clientSecret = '3am8Q~lvnnnkth.6OzPgcqWK.s5c1j7SMVbmlcI_';

const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    clientSecret,
  }
};

const scopes = ['https://graph.microsoft.com/.default'];

const cca = new msal.ConfidentialClientApplication(msalConfig);

async function makeRequest() {
  const fetch = await import('node-fetch');
  const graphClient = Client.initWithMiddleware({
    authProvider: {
      async getAccessToken() {
        const authResult = await cca.acquireTokenByClientCredential({ scopes });
        return authResult.accessToken;
      },
    },
    defaultVersion: 'v1.0',
    debugLogging: true,
    fetch: fetch.default,
  });
  return graphClient;
}
folderIDNaturali = `personal/irina_naturalistone_com/Eu6FZNX4KBFCm8uFaByw6X8BtXUzlvCrpGYLlGOnTCRIqA`

onedriveRouter.get('/', async function getFolderContents(folderId) {
  try {
    const graphClient = await makeRequest();
    const token = await getToken();
    const folder = await graphClient.api(`/me/drive/items/${folderId}`).get();
    const children = await graphClient.api(`/me/drive/items/${folderId}/children`).get({
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(`La carpeta "${folder.name}" tiene ${children.value.length} elementos.`);
    return res.status(200).json({folder, children})
  } catch (error) {
    console.log(error);
  }
})

// async function getToken() {
//   const authResult = await cca.acquireTokenByClientCredential({ scopes });
//   return authResult.accessToken;
// }

//////////////////
 

module.exports = onedriveRouter;

