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


  module.exports = onedriveRouter;