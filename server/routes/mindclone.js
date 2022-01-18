const express  = require('express');

const router = express.Router();

const OpenAI = require('openai-api');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

router.post('/', async(req, res) => {
  const gptResponse = await openai.complete({
    engine: 'curie',
    prompt: req.body.prompt,
    maxTokens: 15,
    temperature: 0.5,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
    stop: ['\n', 'testing'],
  });

  res.send(gptResponse.data);
});

module.exports = router;
