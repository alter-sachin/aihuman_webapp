import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bulma-companion/lib/Card';
import Content from 'react-bulma-companion/lib/Content';
import Title from 'react-bulma-companion/lib/Title';
import Container from 'react-bulma-companion/lib/Container';
import Tile from 'react-bulma-companion/lib/Tile';

export default function ChatbotsSection({ chatbots }) {
  return (
    <Tile type="ancestor">

      <Tile vertical>
        <Container fluid>
          <Card>
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
        <Tile key={idx} vertical>
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
