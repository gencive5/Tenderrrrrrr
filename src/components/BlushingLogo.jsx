import React from 'react';
import './BlushingLogo.css';
import logo from '../assets/logo.svg'; // Adjust the path if necessary

const BlushingLogo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default BlushingLogo;

