import axios from 'axios';

const api = axios.create({
  baseURL: 'https://traca-api.vercel.app/api',
});

export default api;