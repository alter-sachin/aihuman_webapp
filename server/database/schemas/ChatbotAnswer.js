const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatbotAnswerSchema = new Schema({
  chatbotId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  responses: Object,
});

const ChatbotAnswer = mongoose.model('ChatbotAnswer', chatbotAnswerSchema);

module.exports = ChatbotAnswer;
