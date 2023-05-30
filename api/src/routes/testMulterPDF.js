const express = require('express');
const testRouter = express.Router();
const mysqlConnection = require('../db');

testRouter.post('/pdf', async function (req, res) {

//   const pdf = req.files.pdf; 

console.log(req.files.pdf)
//   if (!pdf) {
//     res.status(400).json({ estado: false, mensaje: 'No se proporcionó ningún archivo PDF' });
//     return;
//   }

//   try {
//     // Aquí puedes guardar el archivo PDF en la ubicación deseada, como una carpeta en el servidor o un servicio de almacenamiento en la nube
//     // Puedes utilizar el módulo 'fs' de Node.js o una librería de almacenamiento en la nube como 'aws-sdk' o 'google-cloud-storage'

//     // Ejemplo: Guardar el archivo PDF en una carpeta local
//     const filePath = 'C:\Users\Keki\Desktop\Naturalistone\Naturalistone' + pdf.name;
//     pdf.mv(filePath, function (error) {
//       if (error) {
//         console.error('Error al guardar el archivo PDF:', error);
//         res.status(500).json({ estado: false, mensaje: 'Error al guardar el archivo PDF' });
//       } else {
//         console.log('Archivo PDF guardado correctamente');
//         res.status(200).json({ estado: true, mensaje: 'Archivo PDF guardado correctamente' });
//       }
//     });
//   } catch (error) {
//     console.error('Error al guardar el archivo PDF:', error);
//     res.status(500).json({ estado: false, mensaje: 'Error al guardar el archivo PDF' });
//   }
});

module.exports = testRouter;