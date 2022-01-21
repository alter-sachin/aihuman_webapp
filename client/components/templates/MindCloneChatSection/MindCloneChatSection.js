import React from 'react';
import { getResponse } from '_api/mindclone';
// eslint-disable-next-line no-unused-vars
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
} from '@chatscope/chat-ui-kit-react';

export default function MindCloneChatSection() {
  const inputRef = React.useRef();
  const [msgInputValue, setMsgInputValue] = React.useState('');
  const [userSentMessages, setUserSentMessages] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [activeChatIndex, setActiveChatIndex] = React.useState(0);

  const chatbotOptions = [
    {
      name: 'Elon Musk',
      src: 'https://bot.to/wp-content/uploads/2020/10/elon-musk_5f7f8d1c1c775.png',
    },
    {
      name: 'Naval Ravikant',
      src: 'https://podcast-notes-uploads.imgix.net/2020/05/naval-ravikant.jpg?auto=compress%2Cformat&fit=scale&h=1024&ixlib=php-3.3.0&w=1024&wpsize=large',
    },
  ];

  const callApi = async () => {
    const { name } = chatbotOptions[activeChatIndex];
    if (messages.length !== 0) {
      return getResponse({ name, messages });
    }
    return null;
  };

  React.useEffect(async () => {
    const response = await callApi();
    if (response) {
      setMessages([...messages, {
        message: response.choices[0].text,
        direction: 'incoming',
      }]);
    }
  }, [userSentMessages]);

  const handleSend = message => {
    setMessages([...messages, {
      message,
      direction: 'outgoing',
    }]);
    setUserSentMessages([...userSentMessages, message]);
    setMsgInputValue('');
    inputRef.current.focus();
  };

  const handleChatClick = idx => {
    if (idx !== activeChatIndex) {
      setActiveChatIndex(idx);
      setMessages([]);
    }
  };

  return (
    <MainContainer>
      <Sidebar position="left" scrollable={false}>
        <ConversationList>
          {chatbotOptions.map((option, idx) => (
            <Conversation key={idx} id={idx} name={option.name} onClick={() => handleChatClick(idx)}>
              <Avatar
                src={option.src}
                name={option.name}
                status="available"
              />
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>
      <ChatContainer>
        <ConversationHeader>
          <Avatar
            name={chatbotOptions[activeChatIndex].name}
            src={chatbotOptions[activeChatIndex].src}
            status="available"
          />
          <ConversationHeader.Content userName={chatbotOptions[activeChatIndex].name} info="Online" />
        </ConversationHeader>
        <MessageList>
          {/* eslint-disable-next-line react/no-array-index-key */}
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
  );
}
