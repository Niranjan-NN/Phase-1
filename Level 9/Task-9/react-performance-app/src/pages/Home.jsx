import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/apiService';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData('https://jsonplaceholder.typicode.com/posts')
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {data.slice(0, 10).map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default Home;
