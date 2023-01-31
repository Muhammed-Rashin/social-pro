import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: 'https://backend.pradax.online',
  withCredentials: true,
  headers: {
    token: localStorage.getItem('Accesstoken'),
  },
});

export default instance;
