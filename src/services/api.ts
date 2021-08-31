import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/TarcisioJack/JogaTinnaAPI.js/',
});

export default api;