const express = require('express');
const testRouter = express.Router();
const multer = require('multer');
const path = require('path');


const invoicePath = path.join('/app/OneDrive', 'Naturali', 'InvoicesReceived', 'Parsed Documents', 'Invoice Naturali');
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




// const { PDFDocument } = require('pdf-lib');
// const AWS = require('aws-sdk');
// const fs = require('fs');

// // AWS S3 bucket configuration
// const bucketName = 'your-s3-bucket-name';
// const accessKeyId = 'your-access-key-id';
// const secretAccessKey = 'your-secret-access-key';

// // Create a new PDF document using pdf-lib
// async function createPDF() {
//   const pdfDoc = await PDFDocument.create();
  
//   // Add content to the PDF document (e.g., add pages, text, images, etc.)
//   // ...

//   // Save the PDF as a buffer
//   const pdfBytes = await pdfDoc.save();

//   return pdfBytes;
// }

// // Upload the PDF to S3 bucket
// async function uploadToS3() {
//   try {
//     // Initialize AWS SDK with your access credentials
//     const s3 = new AWS.S3({
//       accessKeyId: accessKeyId,
//       secretAccessKey: secretAccessKey
//     });

//     // Generate the PDF using pdf-lib
//     const pdfBytes = await createPDF();

//     // Specify the S3 upload parameters
//     const params = {
//       Bucket: bucketName,
//       Key: 'example.pdf', // Specify the desired key (filename) for the PDF in the S3 bucket
//       Body: pdfBytes,
//       ACL: 'public-read' // Set ACL to 'public-read' for public access
//     };

//     // Upload the PDF to the S3 bucket
//     const response = await s3.upload(params).promise();
//     console.log('PDF uploaded successfully:', response.Location);
//   } catch (error) {
//     console.error('Error uploading PDF to S3:', error);
//   }
// }

// // Invoke the function to upload the PDF to S3
// uploadToS3();