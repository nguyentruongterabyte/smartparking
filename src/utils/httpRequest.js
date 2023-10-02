import axios from 'axios';

const httpRequest = axios.create({
  // baseUrl: process.env.REACT_APP_BASE_URL,
  baseURL: 'http://10.252.1.112:8080/api',
});

export default httpRequest;
