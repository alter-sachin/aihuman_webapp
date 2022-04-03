import React from 'react';
import PropTypes from 'prop-types';

import Title from 'react-bulma-companion/lib/Title';
import Container from 'react-bulma-companion/lib/Container';

export default function ChatbotEditSection({ chatbot }) {
  return (
    <Container>
      <Title size="2">{chatbot.title}</Title>
    </Container>
  );
}

ChatbotEditSection.propTypes = {
  chatbot: PropTypes.object.isRequired,
};
