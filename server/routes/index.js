const express = require('express');
const path = require('path');

const auth = require('./auth');
const user = require('./user');
const users = require('./users');
const todos = require('./todos');
const mindclone = require('./mindclone');
const model = require('./servemodel');
const form = require('./form');

const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/user', user);
router.use('/api/users', users);
router.use('/api/todos', todos);
router.use('/api/mindclone', mindclone);
router.use('/api/model', model);
router.use('/api/form', form);

router.get('/api/tags', (req, res) => {
  res.send([
    'MERN',
    'Node',
    'Express',
    'Webpack',
    'React',
    'Redux',
    'Mongoose',
    'Bulma',
    'Fontawesome',
    'Ramda',
    'ESLint',
    'Jest',
  ]);
});

router.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

module.exports = router;
