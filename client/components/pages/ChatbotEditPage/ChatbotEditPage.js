import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';
import PropTypes from 'prop-types';

import ChatbotEditSection from '_templates/ChatbotEditSection';

export default function ChatbotEditPage({ match }) {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'));
    }
  }, []);

  const chatbot = user.chatbots.filter(chatbot => chatbot.id === match.params.id)[0];

  return (
    <div>
      <ChatbotEditSection chatbot={chatbot} />
    </div>
  );
}

ChatbotEditPage.propTypes = {
  match: PropTypes.object.isRequired,
};
