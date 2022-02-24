const express = require('express');

const router = express.Router();

const { WidgetQuestion } = require('../database/schemas');

router.get('/', async (req, res) => {
  console.log(req.body);
  const questionData = await WidgetQuestion.find({ id: req.body.id });
  res.send(questionData);
});

router.post('/', async (req, res) => {
  console.log(req.body);
  res.send('ok');
});

module.exports = router;
