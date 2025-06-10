import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>📘 Digital Question Paper System</h1>
      <p>Choose your role to get started:</p>
      <div className="home-buttons">
        <Link to="/teacher" className="home-button">👩‍🏫 Teacher</Link>
        <Link to="/student" className="home-button">👨‍🎓 Student</Link>
      </div>
    </div>
  );
};

export default Home;
