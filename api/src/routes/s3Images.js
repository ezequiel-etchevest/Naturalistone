const express = require('express');
const s3Images = express.Router()


// Configura las credenciales y la región de AWS
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAXKTBXRCEJYTE6LNM',
  secretAccessKey: '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',
  region: 'us-west-1' 
});
// Crea una instancia del servicio S3
const s3 = new AWS.S3();

// Ahora puedes usar s3.getObject() u otros métodos de S3
// Ejemplo:
s3Images.get('/s3/:folder/:fileName', (req, res) => {

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

s3.listBuckets()


  module.exports = s3Images;