const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const endpoint = process.env.S3_ENDPOINT;
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_KEY;
const bucket = process.env.S3_BUCKET || 'media';

const s3 = new AWS.S3({
  endpoint: endpoint,
  accessKeyId,
  secretAccessKey,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

async function uploadFile(key, localPath, contentType) {
  const Body = fs.createReadStream(localPath);
  const params = { Bucket: bucket, Key: key, Body, ContentType: contentType || 'application/octet-stream' };
  await s3.upload(params).promise();
  // Construct public URL assuming nginx will serve /media from S3 synced or using presigned URL
  // For MinIO direct access:
  const url = `${endpoint.replace(/\/$/, '')}/${bucket}/${key}`;
  return url;
}

async function uploadDirectory(prefix, dirPath) {
  const files = fs.readdirSync(dirPath);
  const uploaded = [];
  for (const f of files) {
    const full = path.join(dirPath, f);
    const stat = fs.statSync(full);
    if (stat.isFile()) {
      const key = `${prefix}/${f}`;
      const url = await uploadFile(key, full);
      uploaded.push({ key, url });
    }
  }
  return uploaded;
}

module.exports = { s3, uploadFile, uploadDirectory };