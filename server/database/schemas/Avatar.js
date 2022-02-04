const mongoose = require('mongoose');

const { Schema } = mongoose;

const avatarSchema = new Schema({
  photo: String,
  name: String,
  height: Number,
  weight: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  status: {
    type: String,
    enum: ['PENDING', 'QUEUED', 'COMPLETE'],
    default: 'PENDING',
  },
});

const Avatar = mongoose.model('Avatar', avatarSchema);

module.exports = Avatar;
