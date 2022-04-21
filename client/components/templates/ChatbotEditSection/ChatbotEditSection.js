import React from 'react';
import PropTypes from 'prop-types';

import Title from 'react-bulma-companion/lib/Title';
import Container from 'react-bulma-companion/lib/Container';

import QuestionsSection from '_templates/QuestionsSection';

export default function ChatbotEditSection({ chatbot }) {
  return (
    <Container>
      <Title size="2">{chatbot.title}</Title>
      <Title size="4">{chatbot.description}</Title>
      <QuestionsSection chatbotId={chatbot.id} />
    </Container>
  );
}

ChatbotEditSection.propTypes = {
  chatbot: PropTypes.object.isRequired,
};
