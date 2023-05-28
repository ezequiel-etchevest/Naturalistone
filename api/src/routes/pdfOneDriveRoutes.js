const express = require('express');
const fs = require('fs');
const path = require('path');
const onedriveRouter = express.Router()

onedriveRouter.get('/:filename', (req, res) => {
  const invoicePath = path.join('/app/OneDrive', 'Naturali', 'InvoicesReceived', 'Parsed Documents', 'Invoice Naturali', req.params.filename);

  fs.readFile(invoicePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read file' });
    }
    return res.type('application/pdf').send(data);
  });
});

onedriveRouter.get('/images/img', (req, res) => {
  
  const { material, prodName } = req.query
  const invoicePath = path.join('/app/OneDrive', 'Naturali', 'PHOTOS', `${material}`, `${prodName}`);

  if (!fs.existsSync(invoicePath)) {
    return res.status(200).json({ error: 'Directory not found' });
  }

  fs.readdir(invoicePath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read directory' });
    }

    const imagePaths = files.map(file => path.join(invoicePath, file));
    const imagesToSend = imagePaths.filter(path => fs.statSync(path).isFile());

    const imageData = [];
    let imagesRead = 0;

    imagesToSend.forEach(file => {
      fs.readFile(file, { encoding: 'base64' }, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          imageData.push(data);
        }

        imagesRead++;

        if (imagesRead === imagesToSend.length) {
          // Send the response once all images have been read
          res.json(imageData);
        }
      });
    });
  });
});

onedriveRouter.get('/images/texture', (req, res) => {
  const invoicePath = path.join('/app/OneDrive', 'Naturali', 'PHOTOS');

  if (!fs.existsSync(invoicePath)) {
    return res.status(200).json({ error: 'Directory not found' });
  }

  const imagePaths = [];

  const readDirectory = (directoryPath) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'Unable to read directory' });
      }

      files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        if (fs.statSync(filePath).isFile()) {
          // Add file path to the list
          imagePaths.push(filePath);
        } else {
          // Recursively read subdirectories
          readDirectory(filePath);
        }
      });

      // Once all files and subdirectories have been processed
      if (directoryPath === invoicePath) {
        const imageData = {};
        const folderData = {};

        const readImage = (index) => {
          if (index >= imagePaths.length) {
            // Send the response once all images have been read
            return res.json({ imageData, folderData });
          }

          const file = imagePaths[index];
          const folder = path.basename(path.dirname(file));
          
          if (!folderData[folder]) {
            folderData[folder] = file;
          }

          fs.readFile(file, { encoding: 'base64' }, (err, data) => {
            if (err) {
              console.error(err);
            } else {
              if (!imageData[folder]) {
                imageData[folder] = data;
              }
            }

            readImage(index + 1);
          });
        };

        readImage(0);
      }
    });
  };

  readDirectory(invoicePath); // Invocar la función para que se ejecute

});




  module.exports = onedriveRouter;