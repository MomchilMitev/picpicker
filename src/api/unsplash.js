import axios from 'axios';
const API_KEY = 'XffMZ4eFtuP85PJ2jnzE3fX6L_VolvAwqQs5KX93bo0';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
});
