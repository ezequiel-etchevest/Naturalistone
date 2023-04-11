const express = require('express');
const fs = require('fs');
const path = require('path');
const onedriveRouter = express.Router()

onedriveRouter.get('/', (req, res) => {
  const invoicePath = path.join(__dirname, 'OneDrive/Invoice Naturali/2698.pdf');
  fs.readdir(invoicePath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read directory' });
    }
    return res.json({ files });
  });
});

  module.exports = onedriveRouter;