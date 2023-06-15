// const express = require('express');
// const s3Images = express.Router()


// // Configura las credenciales y la región de AWS
// const AWS = require('aws-sdk');

// AWS.config.update({
//   accessKeyId: 'AKIAXKTBXRCEJYTE6LNM',
//   secretAccessKey: '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',
//   region: 'us-west-1' 
// });
// // Crea una instancia del servicio S3
// const s3 = new AWS.S3();

// // Ahora puedes usar s3.getObject() u otros métodos de S3
// // Ejemplo:
// s3Images.get('/s3/:folder/:fileName', (req, res) => {
//     console.log('chay')
//     const { folder, fileName } = req.params;
//     let path = `${folder}/${fileName}/${fileName}_0.jpg`
//     const params = {
//       Bucket: 'naturalistone-images',
//       Key: path,
//     };
//     s3.getObject(params, (err, data) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Error al obtener la imagen de S3');
//       }
  
//       res.writeHead(200, {
//         'Content-Type': data.ContentType,
//         'Content-Length': data.ContentLength,
//       });
//       res.end(data.Body);
//     });
//   });

//   s3Images.get('/s3/all-images/:folder/:fileName', (req, res) => {
//     console.log('hola')
//     const { folder, fileName } = req.params;
//     const prefix = `${folder}/${fileName}/`;
//     const params = {
//       Bucket: 'naturalistone-images',
//       Prefix: prefix,
//     };
  
//     s3.listObjectsV2(params, (err, data) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Error al obtener las imágenes de S3');
//       }
  
//       const images = data.Contents.map(obj => ({
//         key: obj.Key,
//         url: `https://naturalistone-images.s3.amazonaws.com/${obj.Key}`,
//       }));
  
//       res.status(200).json(images);
//     });
//   });



//   module.exports = s3Images;