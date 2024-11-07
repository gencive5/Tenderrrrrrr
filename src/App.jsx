import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Carousel from './components/FirstCarousel.jsx';
import logo from './assets/images/logo.svg';
import { Gradient } from './components/Gradient.js';
import YesButton from './components/Yes.jsx'; 
import NoButton from './components/No.jsx'; 

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas');
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  return (
    <div className="fullscreen-container">
      <canvas id="gradient-canvas" ref={canvasRef}></canvas>
      <div className="main-zone">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="carousel-container">
          <Carousel activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>
        <div className="button-container">
          <YesButton handleNext={handleNext} />
          <NoButton handleNext={handleNext} />
        </div>
      </div>
    </div>
  );
}

export default App;
