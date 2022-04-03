import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';
import Title from 'react-bulma-companion/lib/Title';

import ChatbotsSection from '_templates/ChatbotsSection';

export default function ChatbotsPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'));
    }
  }, []);

  return (
    <div>
      <Title size="2">Your forms</Title>
      <ChatbotsSection chatbots={user.chatbots} />
    </div>
  );
}
