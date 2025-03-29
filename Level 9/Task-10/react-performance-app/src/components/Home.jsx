import React from 'react';
import PageTransition from './PageTransition';
import '../styles/Home.css';

const Home = () => (
  <PageTransition>
    <div className="page home-page">
      <h1>🏠 Home Page</h1>
      <p>Welcome to our amazing website with smooth transitions! ✨</p>
    </div>
  </PageTransition>
);

export default Home;
