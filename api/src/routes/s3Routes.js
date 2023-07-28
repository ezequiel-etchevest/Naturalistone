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

    console.log('datico', data)

    res.writeHead(200, {
      'Content-Type': data.ContentType,
      'Content-Length': data.ContentLength,
    });

    console.log(data)

    res.end(data.Body);
  });
});

s3Router.get('/pdf/send/:id', (req, res) => {
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

    const buffer = Buffer.from(data.Body, 'binary')

    const base64 = buffer.toString('base64')

    res.status(200).json(base64);
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

s3Router.get('/pdf', (req, res) => {
  const prefix = 'Invoice Naturali/'; // Prefijo de la carpeta en S3
  const params = {
    Bucket: 'naturali-parseddocuments',
    Prefix: prefix,
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).send('Error al obtener los archivos PDF de S3');
    }

    const files = data.Contents.map((file) => ({
      key: file.Key,
      contentType: file.ContentType,
      contentLength: file.ContentLength,
    }));

    res.status(200).json(files);
  });
});

s3Router.get('/pdf/search/:searchTerm', (req, res) => {

  const { searchTerm } = req.params;
  const prefix = 'Invoice Naturali/'; // Prefijo de la carpeta en S3
  const params = {
    Bucket: 'naturali-parseddocuments',
    Prefix: prefix,
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).send('Error al obtener los archivos PDF de S3');
    }

    const files = data.Contents.filter((file) => {
      const key = file.Key;
      const fileParts = key.split('/');
      const fileName = fileParts[fileParts.length - 1];
      return fileName.includes(searchTerm);
    });

    if (files.length === 0) {
      return res.status(200).send('No se encontraron archivos PDF con ese término de búsqueda');
    }

    const fileNames = files.map((file) => {
      const key = file.Key;
      const fileParts = key.split('/');
      const fileName = fileParts[fileParts.length - 1];
      return fileName;
    });

    let highestVersion = -1;
    let highestVersionFileName = '';
    let highestVersionFileUrl = '';

    fileNames.forEach((fileName, index) => {
      const versionMatch = fileName.match(/v(\d+)\./);
      if (versionMatch) {
        const version = parseInt(versionMatch[1]);
        if (version > highestVersion) {
          highestVersion = version;
          highestVersionFileName = fileName.split(".")[0];
          highestVersionFileUrl = `https://naturali-parseddocuments.s3.amazonaws.com/${encodeURIComponent(files[index].Key)}`;
        }
      } else if (!fileName.includes("v")) {
        const version = 0;
        if (version > highestVersion) {
          highestVersion = version;
          highestVersionFileName = fileName.split(".")[0];
          highestVersionFileUrl = `https://naturali-parseddocuments.s3.amazonaws.com/${encodeURIComponent(files[index].Key)}`;
        }
      }
    });

    if (highestVersionFileUrl === '') {
      return res.status(404).send('No se encontró el PDF correspondiente');
    }

    const response = {
      version: highestVersion,
      fileName: highestVersionFileName,
      fileUrl: highestVersionFileUrl
    };

    res.status(200).json(response);
  });
});









  module.exports = s3Router;