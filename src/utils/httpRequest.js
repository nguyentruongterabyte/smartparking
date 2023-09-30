import axios from 'axios';

const httpRequest = axios.create({
  baseUrl: process.env.REACT_APP_BASE_URL,
});

export default httpRequest;
