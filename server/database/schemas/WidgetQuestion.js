const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuestionSchema = new Schema({
  type: {
    type: String,
    enum: ['text', 'radio'],
    required: true,
    default: 'text',
  },
  caption: {
    type: String,
  },
  src: {
    type: String,
  },
  label: {
    type: String,
    required: true,
  },
  options: [String],
});

const widgetQuestionSchema = new Schema({
  questions: [QuestionSchema],
});

const WidgetQuestion = mongoose.model('WidgetQuestion', widgetQuestionSchema);

module.exports = WidgetQuestion;
