const AWS = require('aws-sdk');


// # AWS S3 bucket configuration
// bucket_name = 'naturali-parseddocuments'


// AWS configuration
AWS.config.update({ region: '' });
const accessKeyId = 'AKIAXKTBXRCEOSZTXPPW';
const secretAccessKey = '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';

// Create an S3 service object
const s3 = new AWS.S3({ accessKeyId, secretAccessKey });

// List all buckets
function listBuckets() {
    console.log('entro a la listbuckets function')
  s3.listBuckets((err, data) => {
    if (err) {
      console.error('Error listing buckets:', err);
    } else {
      console.log('Buckets:');
      data.Buckets.forEach((bucket) => {
        console.log(bucket.Name);
      });
    }
  });
}

// Invoke the function to list buckets
module.exports = listBuckets