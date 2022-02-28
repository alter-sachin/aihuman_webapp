const mongoose = require('mongoose');

const { Schema } = mongoose;

const widgetAnswerSchema = new Schema({
  question: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  responses: [Object],
});

const WidgetAnswer = mongoose.model('WidgetAnswer', widgetAnswerSchema);

module.exports = WidgetAnswer;
