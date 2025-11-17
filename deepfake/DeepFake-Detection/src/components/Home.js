import React from 'react';
import './Home.css'; // Home specific CSS
import humanImg from '../assets/human.jpg';

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${humanImg})` }}>
      <div className="overlay">
        <h1>DEEP FAKE</h1>
        <p>
          DeepFake technology is rapidly evolving and can convincingly blur the line between reality and fabrication.
          While it holds remarkable potential across industries like entertainment, gaming, and education, it also presents 
          serious concerns when misused.<br /><br />
          Our intelligent detection platform empowers users to analyze videos and uncover DeepFakes with ease.
          Upload a video—real or fake—and let our system do the rest.
        </p>
      </div>
    </div>
  );
}

export default Home;
