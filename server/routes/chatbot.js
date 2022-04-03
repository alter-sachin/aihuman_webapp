const express  = require('express');

const router = express.Router();

const { User } = require('../database/schemas');

// get all chatbots of a user
router.get('/', async(req, res) => {
  console.log(req.user);
  const user = await User.findById(req.params.id);
  if (!user) {
    res.send(404);
    return;
  }
  res.send(user.chatbots);
});

// get chatbot by id
router.get('/:id/:chatbotId', async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.send(404);
    return;
  }
  const chatbot = user.chatbots.filter(chatbot => chatbot.id === req.params.chatbotId);
  if (chatbot === []) {
    res.send(404);
    return;
  }
  res.send(chatbot);
});

// add a new chatbot
router.post('/:id', async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.send(404);
    return;
  }

  user.chatbots.push(req.body);
  await user.save();
});

// delete chatbot by id
router.delete('/:id/:chatbotId', async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.send(404);
    return;
  }

  const chatbots = user.chatbots.filter(form => form.id !== req.params.formId);
  user.forms = forms;
  await user.save();
  res.send(204);
});

// update form
router.put('/:id/:formId', async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.send(404);
    return;
  }

  // get the form
  const form = user.forms.filter(form => form.id === req.params.formId)[0];

  // get all other forms
  const forms = user.forms.filter(form => form.id !== req.params.formId);
  user.forms = forms;

  user.forms.push();
});

module.exports = router;
