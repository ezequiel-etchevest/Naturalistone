const express = require('express');
const s3Router = express.Router()
const multer = require('multer');
const multerS3 = require('multer-s3');

// Configura las credenciales y la región de AWS
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAXKTBXRCEJ2ANAZSR',
  secretAccessKey: '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',
  region: 'us-east-1' 
});

const s3 = new AWS.S3();

s3Router.get('/images/:folder/:fileName', (req, res) => {
  console.log('chay')
  const { folder, fileName } = req.params;
  let path = `${folder}/${fileName}/${fileName}_0.jpg`
  const params = {
    Bucket: 'naturalistone-images',
    Key: path,
  };
  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener la imagen de S3');
    }

    res.writeHead(200, {
      'Content-Type': data.ContentType,
      'Content-Length': data.ContentLength,
    });
    res.end(data.Body);
  });
});

s3Router.get('/all-images/:folder/:fileName', (req, res) => {
  console.log('hola')
  const { folder, fileName } = req.params;
  const prefix = `${folder}/${fileName}/`;
  const params = {
    Bucket: 'naturalistone-images',
    Prefix: prefix,
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener las imágenes de S3');
    }

    const images = data.Contents.map(obj => ({
      key: obj.Key,
      url: `https://naturalistone-images.s3.amazonaws.com/${obj.Key}`,
    }));
    res.status(200).json(images);
  });
});



s3Router.get('/pdf/:id', (req, res) => {
  const { id } = req.params;

  const key = `Invoice Naturali/${id}.pdf`; // Key del objeto específico a acceder
  const params = {
    Bucket: 'naturali-parseddocuments',
    Key: key,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).send('Error al obtener el archivo PDF de S3');
    }

    res.writeHead(200, {
      'Content-Type': data.ContentType,
      'Content-Length': data.ContentLength,
    });
    res.end(data.Body);
  });
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'naturali-parseddocuments', // Nombre de tu bucket en S3
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.originalname });
    },
    key: function (req, file, cb) {
      const folder = 'Invoice Naturali'; // Nombre de la carpeta deseada
      const fileName = file.originalname;
      const key = `${folder}/${fileName}`;
      cb(null, key);
    },
    fileFilter: function (req, file, cb) {
      cb(null, true); // Permitir todos los archivos
    },
    shouldTransform: function (req, file, cb) {
      cb(null, false); // No transformar el archivo
    }
  })
});

// Ruta para subir un archivo al bucket
s3Router.post('/uploadPdf/:invoiceID', upload.single('pdf'), async (req, res) => {
  try {
    console.log('Archivo guardado en S3');
    // Aquí puedes realizar cualquier acción adicional después de guardar el PDF en S3

    res.status(200).send('Archivo subido exitosamente');
  } catch (error) {
    console.error('Error al subir el archivo a S3:', error);
    res.status(500).send('Error al subir el archivo a S3');
  }
});








  module.exports = s3Router;