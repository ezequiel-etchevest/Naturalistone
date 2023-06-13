// const AWS = require('aws-sdk');
// const express = require('express');
// const s3Images = express.Router()


// // # AWS S3 bucket configuration
// // bucket_name = 'naturali-parseddocuments'


// // AWS configuration
// AWS.config.update({
//   accessKeyId: 'AKIAXKTBXRCEJ2ANAZSR',
//   secretAccessKey: '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',
//   region: 'us-east-1' 
// });
// // Crea una instancia del servicio S3
// const s3 = new AWS.S3();

// // function listBuckets() {
// //     console.log('entro a la listbuckets function')
// //   s3.listBuckets((err, data) => {
// //     if (err) {
// //       console.error('Error listing buckets:', err);
// //     } else {
// //       console.log('Buckets:');
// //       data.Buckets.forEach((bucket) => {
// //         console.log(bucket.Name);
// //       });
// //     }
// //   });
// // }

// // listBuckets()

// // // Función para listar objetos en un bucket
// // function listObjects(bucketName) {
// //   const params = {
// //     Bucket: bucketName
// //   };

// //   s3.listObjects(params, (err, data) => {
// //     if (err) {
// //       console.error('Error al listar objetos:', err);
// //     } else {
// //       console.log('Objetos en el bucket:', data.Contents);
// //     }
// //   });
// // }

// // // Llamada a la función para listar objetos
// // listObjects('naturali-parseddocuments');

// // module.exports = listBuckets;



// // s3Images.get('/s3/pdf/kekitest', (req, res) => {
// //   console.log('hola')
// //   // const { folder, fileName } = req.params;
// //   const prefix = `Invoice Naturali/`;
// //   const params = {
// //     Bucket: 'naturali-parseddocuments',
// //     Prefix: prefix,
// //   };

// //   s3.listObjectsV2(params, (err, data) => {
// //     if (err) {
// //       console.error(err);
// //       return res.status(500).send('Error al obtener las imágenes de S3');
// //     }

// //     // const images = data.Contents.map(obj => ({
// //     //   key: obj.Key,
// //     //   url: `https://naturalistone-images.s3.amazonaws.com/${obj.Key}`,
// //     // }));

// //     res.status(200).json(data);
// //     });
// //   });

// s3Images.get('/pdf/kekitest', (req, res) => {
//   console.log('hola')
//   // const { folder, fileName } = req.params;
//   const prefix = `Invoice Naturali/`;
//   const params = {
//     Bucket: 'naturali-parseddocuments',
//     Prefix: prefix,
//   };

//   s3.listObjectsV2(params, (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error al obtener las pdf s3');
//     }

//     // const images = data.Contents.map(obj => ({
//     //   key: obj.Key,
//     //   url: `https://naturalistone-images.s3.amazonaws.com/${obj.Key}`,
//     // }));

//     res.status(200).json(data);
//     });
//   });

// // s3.listBuckets()


