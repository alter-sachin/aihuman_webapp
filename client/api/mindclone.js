import request from 'superagent';
import { handleSuccess, handleError } from '_utils/api';

export const getResponse = prompt =>
  request.post('/api/mindclone')
    .send(prompt)
    .then(handleSuccess)
    .catch(handleError);
