import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import R from 'ramda';
import { attemptChatbotUpdate } from '_thunks/user';

import QuestionEditModal from '_templates/QuestionEditModal';

export default function QuestionsSection({ questions, chatbotId }) {
  const [questionsList, setQuestionsList] = useState(questions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState();

  const { user } = useSelector(R.pick(['user']));
  const dispatch = useDispatch();

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
    cursor: 'pointer',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
  });

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      questionsList,
      result.source.index,
      result.destination.index,
    );

    setQuestionsList(items);
  };

  const openQuestionEditModal = question => {
    setQuestion(question);
    setIsModalOpen(true);
  };

  const saveData = data => {
    const updatedUser = user;

    // get the chatbot where changes have been made
    const chatbot = updatedUser.chatbots.filter(chatbot => chatbot.id === chatbotId)[0];
    const idx = updatedUser.chatbots.indexOf(chatbot);

    // get the question where changes have been made
    const question = chatbot.questions.filter(question => question.id === data.id)[0];

    // make changes in the chatbot
    chatbot.questions[chatbot.questions.indexOf(question)] = data;

    // make changes in the user
    updatedUser.chatbots[idx] = chatbot;

    // save changes
    dispatch(attemptChatbotUpdate(updatedUser, chatbotId));
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {questionsList.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                      onClick={() => openQuestionEditModal(item)}
                    >
                      {item.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <QuestionEditModal
        isOpen={isModalOpen}
        question={question}
        setIsOpen={setIsModalOpen}
        saveUpdatedData={saveData}
      />
    </React.Fragment>
  );
}

QuestionsSection.propTypes = {
  questions: PropTypes.array.isRequired,
  chatbotId: PropTypes.string.isRequired,
};
