import axios from 'axios';
import config from '~/config';
// baseURL: 'http://localhost:8080/api',

export default axios.create({
  baseURL: config.constants.SERVER_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: config.constants.SERVER_BASE_URL,
  headers: { 'Content-Type': 'application/json', withCredentials: true },
});
