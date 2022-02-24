const express = require('express');

const router = express.Router();

const { WidgetQuestion, WidgetAnswer } = require('../database/schemas');

router.get('/', async (req, res) => {
  console.log(req.body);
  const questionData = await WidgetQuestion.find({ id: req.body.id });
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
