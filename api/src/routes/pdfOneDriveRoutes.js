// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const onedriveRouter = express.Router()

// onedriveRouter.get('/:filename', (req, res) => {
//   const invoicePath = path.join('/app/OneDrive', 'Naturali', 'InvoicesReceived', 'Parsed Documents', 'Invoice Naturali', req.params.filename);

//   fs.readFile(invoicePath, (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Unable to read file' });
//     }
//     return res.type('application/pdf').send(data);
//   });
// });

// onedriveRouter.get('/images/img', (req, res) => {
  
//   const { material, prodName } = req.query
//   const invoicePath = path.join('/app/OneDrive', 'Naturali', 'PHOTOS', `${material}`, `${prodName}`);

//   if (!fs.existsSync(invoicePath)) {
//     return res.status(200).json({ error: 'Directory not found' });
//   }

//   fs.readdir(invoicePath, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Unable to read directory' });
//     }

//     const imagePaths = files.map(file => path.join(invoicePath, file));
//     const imagesToSend = imagePaths.filter(path => fs.statSync(path).isFile());

//     const imageData = [];
//     let imagesRead = 0;

//     imagesToSend.forEach(file => {
//       fs.readFile(file, { encoding: 'base64' }, (err, data) => {
//         if (err) {
//           console.error(err);
//         } else {
//           imageData.push(data);
//         }

//         imagesRead++;

//         if (imagesRead === imagesToSend.length) {
//           // Send the response once all images have been read
//           res.json(imageData);
//         }
//       });
//     });
//   });
// });

// onedriveRouter.get('/images/texture', (req, res) => {
  
//   const { material, prodName } = req.query
//   const invoicePath = path.join('/app/OneDrive', 'Naturali', 'PHOTOS', `${material}`, `${prodName}`);

//   if (!fs.existsSync(invoicePath)) {
//     return res.status(200).json({ error: 'Directory not found' });
//   }

//   fs.readdir(invoicePath, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Unable to read directory' });
//     }

//     const imagePaths = files.map(file => path.join(invoicePath, file));
//     const imagesToSend = imagePaths.filter(path => fs.statSync(path).isFile());

//     const imageData = [];
//     let imagesRead = 0;

//     imagesToSend.forEach(file => {
//       fs.readFile(file, { encoding: 'base64' }, (err, data) => {
//         if (err) {
//           console.error(err);
//         } else {
//           imageData.push(data);
//         }

//         imagesRead++;

//         if (imagesRead === imagesToSend.length) {
//           // Send the response once all images have been read
//           res.json(imageData);
//         }
//       });
//     });
//   });
// });

// module.exports = onedriveRouter

