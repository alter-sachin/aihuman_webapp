import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const getUser = () =>
  request.get('/api/user')
    .then(handleSuccess)
    .catch(handleError);

export const putUser = info =>
  request.put('/api/user')
    .send(info)
    .then(handleSuccess)
    .catch(handleError);

export const putUserPassword = passwordInfo =>
  request.put('/api/user/password')
    .send(passwordInfo)
    .then(handleSuccess)
    .catch(handleError);

export const putChatbot = (updatedUser, chatbotId) =>
  request.put(`/api/chatbot/${chatbotId}`)
    .send(updatedUser)
    .then(handleSuccess)
    .catch(handleError);

export const getGenerateChatbot = (chatbotId) =>
  request.get(`/api/chatbot/generate/${chatbotId}`)
    .send()
    .then(handleSuccess)
    .catch(handleError);
