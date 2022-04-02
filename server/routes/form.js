const express  = require('express');

const router = express.Router();

const { User } = require('../database/schemas');

// get all forms of a user
router.get('/:id', async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.send(404);
    return;
  }
  res.send(user.forms);
});

// get form by id
router.get('/:id/:formId', async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.send(404);
    return;
  }
  const form = user.forms.filter(form => form.id === req.params.formId);
  if (form === []) {
    res.send(404);
    return;
  }
  res.send(form);
});

// add a new form
router.post('/:id/:formId', async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.send(404);
    return;
  }

  user.forms.push(req.body);
  await user.save();
});

// delete form by id
router.delete('/:id/:formId', async(req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.send(404);
    return;
  }

  const forms = user.forms.filter(form => form.id !== req.params.formId);
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
