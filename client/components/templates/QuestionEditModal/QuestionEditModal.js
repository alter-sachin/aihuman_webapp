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
import Checkbox from 'react-bulma-companion/lib/Checkbox';

export default function QuestionEditModal({ isOpen, question, setIsOpen, saveUpdatedData }) {
  const [text, setText] = useState(question.text);
  const [name, setName] = useState(question.name);
  const [options, setOptions] = useState(question.options);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);

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

  const handleCheckboxChange = () => {
    setIsMultipleChoice(!isMultipleChoice);
    if (!isMultipleChoice) setOptions([]);
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
    data.text = text;
    data.name = name;
    data.options = options;
    data.id = question.id;
    saveUpdatedData(data);
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

          <Checkbox>
            <input type="checkbox" onChange={handleCheckboxChange} />
            <span>Multiple choice question</span>
          </Checkbox>

          {isMultipleChoice && (
            <React.Fragment>
              <Label>Options</Label>
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
          )}

        </Modal.CardBody>
        <Modal.CardFoot>
          <Button color="success" onClick={saveData}>Save Changes</Button>
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
};

QuestionEditModal.defaultProps = {
  question: {
    text: '',
    name: '',
    options: [],
  },
};
