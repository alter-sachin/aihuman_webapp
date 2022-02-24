const express = require('express');

const router = express.Router();

const { WidgetQuestion, WidgetAnswer } = require('../database/schemas');

router.get('/:id', async (req, res) => {
  const questionData = await WidgetQuestion.find({ id: req.params.id });
  res.send(questionData);
});

const parseResponse = (rawResponses, questionId) => {
  const parsedResponse = {};
  parsedResponse.question = questionId;
  const responses = [];
  Object.entries(rawResponses).forEach(([label, response]) => {
    responses.push({ label, response });
  });
  parsedResponse.responses = responses;
  return parsedResponse;
};

router.post('/:questionId', async (req, res) => {
  const response = new WidgetAnswer(
    parseResponse(req.body, req.params.questionId)
  );
  await response.save();
  res.send('ok');
});

module.exports = router;
