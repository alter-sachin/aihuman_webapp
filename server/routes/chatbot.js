const express  = require('express');

const router = express.Router();

const axios = require('axios');
const https = require('https');
const cors = require('cors');

const { User } = require('../database/schemas');
const { ChatbotAnswer } = require('../database/schemas');

// get all chatbots of a user
router.get('/', async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.send(404);
    return;
  }
  res.send(user.chatbots);
});

// add a new chatbot
router.post('/', async(req, res) => {
  const user = await User.findById(req.user.id);

  user.chatbots.push({ title: 'Sample title', description: 'Sample description' });
  await user.save();
  res.send({ message: 'Sample chatbot created. Edit to personalize.', user: user.hidePassword() });
});

// add a new question
router.post('/:chatbotId', async(req, res) => {
  const { chatbotId } = req.params;
  const user = await User.findById(req.user.id);

  const index = user.chatbots.findIndex(chatbot => chatbot.id === chatbotId);

  user.chatbots[index].questions.push({
    text: 'What is your name?',
    name: 'name',
    videoLink: 'https://buildarassets.s3.amazonaws.com/1650618797.0980403.mp4',
  });
  await user.save();
  res.send({ message: 'Sample question created. Edit to personalize.', user: user.hidePassword() });
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
  const { chatbotId } = req.params;
  const data = req.body;

  const user = await User.findById(req.user.id);
  const index = user.chatbots.findIndex(
    (chatbot) => chatbot.id === chatbotId,
  );

  if (data.title) user.chatbots[index].title = data.title;
  if (data.description) user.chatbots[index].description = data.description;

  res.send({ message: 'Chatbot updated!' });
});

// update question
router.put('/question/:chatbotId', async(req, res) => {
  const { chatbotId } = req.params;
  const data = req.body;

  const user = await User.findById(req.user.id);
  const chatbotIndex = user.chatbots.findIndex(
    chatbot => chatbot.id === chatbotId,
  );
  const questionIndex = user.chatbots[chatbotIndex].questions.findIndex(question => question.id === data.id);

  Object.assign(user.chatbots[chatbotIndex].questions[questionIndex], data);
  await user.save();

  res.send({ message: 'Chatbot updated!', user: user.hidePassword() });
});

const textToSpeech = async(bot, text) => {
  const response = await axios({
    url: 'https://139.59.39.176:8008/audio',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AUDIO_TOKEN}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      speakerId: bot,
      textScript: text,
      speed: 0,
    },
    httpsAgent: new https.Agent({ // ignore ssl issues
      rejectUnauthorized: false,
    }),
  });
  return response.data;
};

const speechToVideo = async(audioUrl) => {
  const response = await axios({
    url: 'http://buildar1.ngrok.io/video',
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      category: '0',
      audioUrl,
      actorId: '0',
      companyName: '0',
    }),
  });
  return response.data;
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

router.get('/generate/:chatbotId', async(req, res) => {
  const userId = req.user.id;
  const { chatbotId } = req.params;

  const user = await User.findById(userId);
  const chatbotIndex = user.chatbots.findIndex(chatbot => chatbot.id === chatbotId);
  const { questions } = user.chatbots[chatbotIndex];

  const addVideoLinks = async() => {
    await asyncForEach(questions, async(question) => {
      const { audioUrl } = await textToSpeech('Amy', question.text);
      const { videoUrl } = await speechToVideo(audioUrl);
      question.videoLink = videoUrl;
    });
    user.chatbots[chatbotIndex].questions = questions;
    await user.save();
  };

  await addVideoLinks();

  res.send({ message: 'Videos created successfully.' });
});

// get chatbot by id
router.get('/use/:id/:chatbotId', cors(), async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.sendStatus(404);
    return;
  }
  const chatbot = user.chatbots.filter(chatbot => chatbot.id === req.params.chatbotId)[0];
  if (chatbot === []) {
    res.send(404);
    return;
  }
  res.send(chatbot);
});

// serve preflight options request
router.options('/answer/:chatbotId', cors());
// receive responses on chatbot
router.post('/answer/:chatbotId', cors(), async(req, res) => {
  const { chatbotId } = req.params;
  const responses = req.body;

  const newAnswerDocument = new ChatbotAnswer({ chatbotId, responses });
  await newAnswerDocument.save();
  res.json({ message: 'ok' });
});

module.exports = router;
