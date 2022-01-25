const express  = require('express');

const router = express.Router();

const path = require('path');

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'model.glb'));
});

router.get('/shoe', (req, res) => {
  res.sendFile(path.join(__dirname, 'shoe-draco.glb'));
});



module.exports = router;
