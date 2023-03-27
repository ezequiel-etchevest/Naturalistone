const fetch = require('isomorphic-fetch');
const { getOneDriveAccessToken } = require('../oneDriveAuth');
const express = require('express');
const onedriveRouter = express.Router()

// Ruta para descargar un archivo PDF
async function downloadPdf(req, res) {
  // Obtener el nombre del archivo de los parámetros de la ruta
  const {filename} = req.params;
    console.log('filename',{filename})
  // Obtener el token de acceso a OneDrive
  const accessToken = await getOneDriveAccessToken();
  console.log({accessToken})
  // Construir la URL para descargar el archivo
  const downloadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/Naturali/InvoicesReceived/Invoice%20Naturali/${filename}:/content`;

  // Agregar el token de acceso al encabezado Authorization de la solicitud
  const headers = { 'Authorization': `Bearer ${accessToken}` };

  // Descargar el archivo desde OneDrive y enviarlo como respuesta al cliente
  const response = await fetch(downloadUrl, { headers });
  const buffer = await response.buffer();

  res.set('Content-Type', 'application/pdf');
  res.send(buffer);
}

onedriveRouter.get('/pdf/:filename', downloadPdf);

module.exports = onedriveRouter;

