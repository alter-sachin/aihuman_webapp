const express  = require('express');

const router = express.Router();

const OpenAI = require('openai-api');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const parseRequestToPrompt = (request) => {
  const { name, messages } = request;
  const contextForBot = `You are ${name}. I will ask you questions and you will respond as ${name}.\n`;
  let questionAnswers = '';
  for (let i = 0; i < messages.length; ++i) {
    if (messages[i].direction === 'incoming') {
      questionAnswers = questionAnswers.concat('A. ', messages[i].message, '\n');
    }
    else {
      questionAnswers = questionAnswers.concat('Q. ', messages[i].message, '\n');
    }
  }
  return contextForBot.concat(questionAnswers, 'A.');
};

router.post('/', async(req, res) => {
  try {
    const prompt = parseRequestToPrompt(req.body);
    const gptResponse = await openai.complete({
      engine: 'curie',
      prompt,
      maxTokens: 50,
      temperature: 0.8,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ['\n', 'testing'],
    });
    res.send(gptResponse.data);
  }
  catch (e) {
    console.error(e);
  }
});

module.exports = router;
