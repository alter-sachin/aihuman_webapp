import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import QuestionEditModal from '_templates/QuestionEditModal';

export default function QuestionsSection({ questions }) {
  const [itemsList, setItemsList] = useState(questions);
  const [isModalOpen, setIsModalOpen] = useState(true);

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
      itemsList,
      result.source.index,
      result.destination.index,
    );

    setItemsList(items);
  };

  const openQuestionEditModal = item => {

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
              {itemsList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
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
      <QuestionEditModal isOpen={isModalOpen} />
    </React.Fragment>
  );
}

QuestionsSection.propTypes = {
  questions: PropTypes.array.isRequired,
};
