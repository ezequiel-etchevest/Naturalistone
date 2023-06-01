const express = require('express');
const testRouter = express.Router();
const multer = require('multer');
const path = require('path');


const invoicePath = path.join('/app/OneDrive2', 'Nuevos Invoices');
// Configurar multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, invoicePath); // Especifica la carpeta de destino donde deseas guardar el archivo PDF
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Especifica el nombre del archivo PDF
  },
});

const upload = multer({ storage });

testRouter.post('/', upload.single('pdfFile'), async function (req, res) {
  try {
    console.log(req.file); // Verificar el objeto file recibido

    const filePath = req.file.path; // Obtener la ruta del archivo guardado

    console.log('PDF guardado en el servidor correctamente en:', filePath);
    res.status(200).send('PDF guardado en el servidor.');
  } catch (error) {
    console.error('Error al guardar el PDF en el servidor:', error);
    res.status(500).send('Error al guardar el PDF en el servidor.');
  }
});

module.exports = testRouter;
