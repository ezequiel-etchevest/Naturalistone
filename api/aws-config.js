const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAXKTBXRCEJYTE6LNM',
  secretAccessKey: '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',
});

const s3 = new AWS.S3();
