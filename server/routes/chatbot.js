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
    res.status(404).send({ message: 'User not found' });
    return;
  }

  const { chatbots } = req.body;
  const changedChatbot = chatbots.filter(
    (chatbot) => chatbot.id === req.params.chatbotId,
  )[0];

  const userChatbotIndex = user.chatbots.findIndex(
    (chatbot) => chatbot.id === req.params.chatbotId,
  );
  Object.assign(user.chatbots[userChatbotIndex], changedChatbot);
  await user.save();
  res.send({ message: 'Question updated!' });
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
  console.log(response.data);
  return response.data;
};

const speechToVideo = async(audioUrl) => {
  const response = await axios({
    url: 'http://buildar2.ngrok.io/video',
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
  console.log(response.data);
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
      questions.videoLink = videoUrl;
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
    res.send(404);
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
