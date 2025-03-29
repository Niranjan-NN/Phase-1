import axios from 'axios';

const cache = new Map();

export const fetchData = async (url) => {
  if (cache.has(url)) {
    console.log('Serving from cache:', url);
    return cache.get(url);
  }

  const response = await axios.get(url);
  cache.set(url, response.data);
  return response.data;
};
