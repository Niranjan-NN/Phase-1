import React from 'react';
import PageTransition from './PageTransition';
import '../styles/About.css';

const About = () => (
  <PageTransition>
    <div className="page about-page">
      <h1>ℹ️ About Us</h1>
      <p>We build awesome web applications with seamless animations! 🚀</p>
    </div>
  </PageTransition>
);

export default About;
