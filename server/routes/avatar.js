const express = require('express');

const router = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');
// const fileType = require('file-type');
const multiparty = require('multiparty');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

router.post('/', async (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(500).send(error);
    }
    try {
      const { path } = files.file[0];
      const buffer = fs.readFileSync(path);
      const type = 'png'; // await fileType.fromBuffer(buffer);
      const fileName = `user-upload/${Date.now().toString()}`;
      const data = await uploadFile(buffer, fileName, type);
      console.log(data);
      return res.status(200).send(data);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });
});

module.exports = router;
