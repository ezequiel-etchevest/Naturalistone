const express = require('express');
const fs = require('fs');
const path = require('path');
 
//  const fetchImages = (data, callback) => {
//     const imagePromises = data.map(obj => {
//       const { Material, ProductName } = obj;
//       const invoicePath = path.join('/app/OneDrive', 'Naturali', 'PHOTOS', Material, ProductName);
  
//       return new Promise((resolve, reject) => {
//         if (!fs.existsSync(invoicePath)) {
//           reject(new Error(`Directory not found for ${Material} - ${ProductName}`));
//         }
  
//         fs.readdir(invoicePath, (err, files) => {
//           if (err) {
//             reject(new Error(`Unable to read directory for ${Material} - ${ProductName}`));
//           }
  
//           const imagePaths = files.map(file => path.join(invoicePath, file));
//           const imagesToSend = imagePaths.filter(path => fs.statSync(path).isFile());
  
//           const imageData = [];
//           let imagesRead = 0;
  
//           imagesToSend.forEach(file => {
//             fs.readFile(file, { encoding: 'base64' }, (err, data) => {
//               if (err) {
//                 console.error(err);
//               } else {
//                 imageData.push(data);
//               }
  
//               imagesRead++;
  
//               if (imagesRead === imagesToSend.length) {
//                 resolve(imageData);
//               }
//             });
//           });
//         });
//       });
//     });
  
//     Promise.allSettled(imagePromises)
//       .then(results => {
//         const updatedData = data.map((obj, index) => {
//           if (results[index].status === 'fulfilled') {
//             obj.images = results[index].value;
//           }
//           return obj;
//         });
  
//         callback(null, updatedData);
//       })
//       .catch(error => {
//         callback(error);
//       });
//   };




const getImage = (array) => {
  const newArray = array.map(obj => {
    const imagePath = `/app/OneDrive/Naturali/PHOTOS/${obj.material}/${obj.prodName}/${obj.prodName}_0.jpg`;
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }
    fs.readFile(imagePath, { encoding: 'base64' }, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Unable to read image' });
      }
      
    return {
      ...obj,
      img: data
    }
  })
  
})}

module.exports = {
getImage: getImage
 };
  