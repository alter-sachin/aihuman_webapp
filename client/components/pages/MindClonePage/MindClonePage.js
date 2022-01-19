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
  Sidebar,
  ConversationList,
  Conversation,
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
        <Sidebar position="left" scrollable={false}>
          <ConversationList>
            <Conversation name="Elon">
              <Avatar
                src="https://bot.to/wp-content/uploads/2020/10/elon-musk_5f7f8d1c1c775.png"
                name="Elon"
                status="available"
              />
            </Conversation>
            <Conversation name="Naval">
              <Avatar
                src="https://podcast-notes-uploads.imgix.net/2020/05/naval-ravikant.jpg?auto=compress%2Cformat&fit=scale&h=1024&ixlib=php-3.3.0&w=1024&wpsize=large"
                name="Naval"
                status="available"
              />
            </Conversation>
          </ConversationList>
        </Sidebar>
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
