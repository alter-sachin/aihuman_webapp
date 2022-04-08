const express  = require('express');

const router = express.Router();

const { User } = require('../database/schemas');

// get all chatbots of a user
router.get('/', async(req, res) => {
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
    res.status(404).send('user not found');
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

  const chatbots = user.chatbots.filter(chatbot => chatbot.id !== req.params.chatbotId);
  user.chatbots = chatbots;
  await user.save();
  res.send(204);
});

// update chatbot
router.put('/:chatbotId', async(req, res) => {

  // get user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404).send('user not found');
    return;
  }

  const { chatbots } = req.body;
  const changedChatbot = chatbots.filter(chatbot => chatbot.id === req.params.chatbotId)[0];

  const userChatbotIndex = user.chatbots.findIndex(chatbot => chatbot.id === req.params.chatbotId);
  Object.assign(user.chatbots[userChatbotIndex], changedChatbot);
  await user.save();
  res.status(201).send({ message: 'Question updated!' });
});

module.exports = router;
