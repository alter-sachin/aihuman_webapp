import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bulma-companion/lib/Modal';
import Delete from 'react-bulma-companion/lib/Delete';
import Button from 'react-bulma-companion/lib/Button';
import Field from 'react-bulma-companion/lib/Field';
import Input from 'react-bulma-companion/lib/Input';
import Label from 'react-bulma-companion/lib/Label';
import Control from 'react-bulma-companion/lib/Control';
import Help from 'react-bulma-companion/lib/Help';
import {  attemptGenerateVideo } from '_thunks/user';
import { useDispatch } from 'react-redux';

export default function QuestionEditModal({ isOpen, question, setIsOpen, saveUpdatedData, chatbotId }) {
  const [text, setText] = useState(question.text);
  const [name, setName] = useState(question.name);
  const [options, setOptions] = useState(question.options);
  useEffect(() => {
    setText(question.text);
    setName(question.name);
    setOptions(question.options);
  }, [isOpen]);

  const addNewOptionField = () => {
    setOptions([...options, {
      id: options.length > 0 ? options.at(-1).id + 1 : 0,
      text: '',
    }]);
  };

  const changeOptionValue = (event, idx) => {
    const { value } = event.target;
    const newOptions = [...options];
    newOptions[idx].text = value;
    setOptions(newOptions);
  };

  const deleteOptionField = idx => {
    const newOptions = [...options];
    newOptions.splice(idx, 1);
    setOptions(newOptions);
  };

  const handleTextChange = e => {
    setText(e.target.value);
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const resetData = () => {
    setText('');
    setName('');
    setOptions([]);
    closeModal();
  };

  const saveData = () => {
    const data = {};
    if (text !== question.text) data.text = text;
    if (name !== question.name) data.name = name;
    if (options !== question.options) data.options = options;
    data.id = question.id;
    saveUpdatedData(data);
  };

  const dispatch = useDispatch();

  const generateVideo = () => {
    dispatch(attemptGenerateVideo(chatbotId, question.id));
  };

  return (
    <Modal active={isOpen}>
      <Modal.Background />
      <Modal.Card>
        <Modal.CardHead>
          <Modal.CardTitle>
            Question
          </Modal.CardTitle>
          <Delete onClick={closeModal} />
        </Modal.CardHead>
        <Modal.CardBody>

          {/* Live feedback */}
          <React.Fragment>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video src={question.videoLink} autoPlay />
            <p>
              Question:
              {' '}
              {text}
            </p>
            <p>
              Answer for &apos;
              {name}
              &apos;
              :
            </p>
            {options.length > 0
              ? (options.map(option => (
                <React.Fragment key={option.id}>
                  <input type="radio" name={name} value={option.text} />
                  <label>{option.text}</label>
                </React.Fragment>
              )))
              : <input type="text" placeholder="User input" disabled />}
          </React.Fragment>

          <Field>
            <Label>Question text</Label>
            <Control>
              <Input placeholder="Eg: What is your name?" onChange={handleTextChange} value={text} />
            </Control>
            <Help>This text will be converted into a video.</Help>
          </Field>

          <Field>
            <Label>Unique identifier</Label>
            <Control>
              <Input placeholder="Eg: name" onChange={handleNameChange} value={name} />
            </Control>
            <Help>This will identify which response belongs to which question.</Help>
          </Field>

          <Label>Options</Label>
          {(options.length > 0) ? (
            <React.Fragment>
              {options.map((option, idx) => (
                <React.Fragment key={option.id}>
                  <Field>
                    <Control>
                      <Input onChange={e => changeOptionValue(e, idx)} placeholder="Option" value={options[idx].text} />
                    </Control>
                  </Field>
                  <Delete color="danger" onClick={() => deleteOptionField(idx)} />
                </React.Fragment>
              ))}
              <Button onClick={addNewOptionField}>Add option</Button>
              <Help>Options available to the user.</Help>
            </React.Fragment>
          )
            : <Button onClick={addNewOptionField}>Add option</Button>}

        </Modal.CardBody>
        <Modal.CardFoot>
          <Button color="success" onClick={saveData}>Save Changes</Button>
          <Button color="success" onClick={generateVideo}>Generate Video</Button>
          <Button onClick={resetData}>Cancel</Button>
        </Modal.CardFoot>
      </Modal.Card>
    </Modal>
  );
}

QuestionEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  question: PropTypes.object,
  setIsOpen: PropTypes.func.isRequired,
  saveUpdatedData: PropTypes.func.isRequired,
  chatbotId: PropTypes.string.isRequired,
};

QuestionEditModal.defaultProps = {
  question: {
    text: '',
    name: '',
    options: [],
  },
};
