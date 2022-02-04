const express = require('express');

const router = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');
// const fileType = require('file-type');
const multiparty = require('multiparty');

const { Avatar } = require('../database/schemas');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-south-1',
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

const parseFormFields = (fields) => {
  const parsedFields = {};
  Object.entries(fields).forEach(([key, value]) => {
    parsedFields[key] = value[0];
  });
  return parsedFields;
};

const pushToQueue = (newAvatar) => {
  newAvatar.status = 'QUEUED';
  const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
  const params = {
    MessageBody: JSON.stringify(newAvatar),
    QueueUrl: process.env.AWS_SQS_URL,
  };
  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      newAvatar.save();
    }
  });
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
      const imageUploadLink = await uploadFile(buffer, fileName, type);

      const avatarDetails = parseFormFields(fields);
      avatarDetails.photo = imageUploadLink.Location;

      const newAvatar = new Avatar(avatarDetails);
      newAvatar.save();
      pushToQueue(newAvatar);
      return res.status(200).send(newAvatar.id);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });
});

router.get('/:id', async (req, res) => {
  const avatar = await Avatar.findOne({ id: req.params.id });
  console.log(avatar);
  res.send(avatar);
});

module.exports = router;
