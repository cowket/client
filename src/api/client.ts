import axios from 'axios';

const client = axios.create({
  withCredentials: true,
  timeout: 30000,
  timeoutErrorMessage: 'time out error',
  baseURL: 'https://cw.malrang.dev',
  headers: {
    Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => {
    return status < 500;
  },
});

client.interceptors.request.use((value) => {
  const token = localStorage.getItem('cowket-token');
  if (token) {
    value.headers.Authorization = `Bearer ${token}`;
    // value.headers.refreshToken = 'true';
  }
  return value;
});

client.interceptors.response.use((value) => {
  if (value.headers.authorization) {
    localStorage.setItem('cowket-token', value.headers.authorization);
    axios.defaults.headers.Authorization = `Bearer ${value.headers.authorization}`;
  }
  return value;
});

export default client;
