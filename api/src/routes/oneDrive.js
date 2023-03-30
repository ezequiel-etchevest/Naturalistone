const fetch = require('isomorphic-fetch');
const { getOneDriveAccessToken } = require('../oneDriveAuth');
const express = require('express');
const onedriveRouter = express.Router()


// async function getFileMetadata(filename, accessToken) {
//   const metadataUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/Naturali/InvoicesReceived/Invoice%20Naturali/${filename}:/content`;
//   const headers = { 'Authorization': `Bearer ${accessToken}` };

//   const response = await fetch(metadataUrl, { headers });
//   const data = await response.json();
//   return data;
// }

// async function downloadPdf(req, res) {
//   const {filename} = req.params;

//   const accessToken = await getOneDriveAccessToken();
//   const fileMetadata = await getFileMetadata(filename, accessToken);
 
//   const downloadUrl = fileMetadata['@microsoft.graph.downloadUrl'];
// console.log(fileMetadata)
//   const headers = { 'Authorization': `Bearer ${accessToken}` };

//   try {
//     const response = await fetch(downloadUrl, { headers });
//     const buffer = await response.buffer();
  
//     res.set('Content-Type', 'application/pdf');
//     res.send(buffer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error al descargar el archivo');
//   }
  
// }

// Ruta para descargar un archivo PDF
async function downloadPdf(req, res) {
  // Obtener el nombre del archivo de los parámetros de la ruta
  const {filename} = req.params;

  // Obtener el token de acceso a OneDrive
  const accessToken = await getOneDriveAccessToken();

  // Construir la URL para descargar el archivo
  const downloadUrl = `https://graph.microsoft.com/v1.0/drive/root:/Naturali/InvoicesReceived/Invoice%20Naturali/${filename}/content`;

  // Agregar el token de acceso al encabezado Authorization de la solicitud
  const headers = { 'Authorization': `Bearer ${accessToken}` };

  // Descargar el archivo desde OneDrive y enviarlo como respuesta al cliente
  const response = await fetch(downloadUrl, { headers });
  const buffer = await response.buffer();
console.log(buffer)
res.set('Content-Disposition', 'inline');
  res.send(buffer);
}

onedriveRouter.get('/pdf/:filename', downloadPdf);

module.exports = onedriveRouter;

