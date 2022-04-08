const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
  },
  options: {
    type: Array,
    required: true,
  },

});

module.exports = questionSchema;
