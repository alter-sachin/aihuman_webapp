import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import Card from 'react-bulma-companion/lib/Card';
import Content from 'react-bulma-companion/lib/Content';
import Title from 'react-bulma-companion/lib/Title';
import Container from 'react-bulma-companion/lib/Container';
import Tile from 'react-bulma-companion/lib/Tile';

import { attemptChatbotCreate } from '_thunks/user';

export default function ChatbotsSection({ chatbots }) {
  const dispatch = useDispatch();

  const openQuestionEditPage = idx => {
    dispatch(push(`/chatbot/${chatbots[idx].id}`));
  };

  const createChatbot = () => {
    dispatch(attemptChatbotCreate());
  };

  return (
    <Tile type="ancestor">

      <Tile vertical>
        <Container fluid>
          <Card onClick={createChatbot}>
            <Card.Content>
              <Content>
                <Title size="4">Create</Title>
                <Title size="6" subtitle>
                  Create a new chatbot
                </Title>
              </Content>
            </Card.Content>
          </Card>
        </Container>
      </Tile>

      {chatbots.map((chatbot, idx) => (
        <Tile key={idx} vertical onClick={() => openQuestionEditPage(idx)}>
          <Container fluid>
            <Card>
              <Card.Content>
                <Content>
                  <Title size="4">{chatbot.title}</Title>
                  <Title size="6" subtitle>
                    {chatbot.description}
                  </Title>
                </Content>
              </Card.Content>
            </Card>
          </Container>
        </Tile>
      ))}
    </Tile>
  );
}

ChatbotsSection.propTypes = {
  chatbots: PropTypes.array.isRequired,
};

ChatbotsSection.defaultProps = {
};
