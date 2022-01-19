import React from 'react';
import { getResponse } from '_api/mindclone';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
} from '@chatscope/chat-ui-kit-react';

export default function MindClonePage() {
  const inputRef = React.useRef();
  const [msgInputValue, setMsgInputValue] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const handleSend = message => {
    setMessages([...messages, {
      message,
      direction: 'outgoing',
    }]);
    setMsgInputValue('');
    inputRef.current.focus();
  };

  return (
    <div style={{ position: 'relative', height: '500px' }}>
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <Avatar
              src="https://bot.to/wp-content/uploads/2020/10/elon-musk_5f7f8d1c1c775.png"
              name="Elon"
              status="available"
            />
            <ConversationHeader.Content userName="Elon Musk" info="Online" />
          </ConversationHeader>
          <MessageList>
            {messages.map((m, i) => <Message key={i} model={m} />)}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={handleSend}
            onChange={setMsgInputValue}
            value={msgInputValue}
            ref={inputRef}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
