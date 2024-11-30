import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Carousel from './components/FirstCarousel.jsx';
import logo from './assets/images/heart3D8.png';
import { Gradient } from './components/Gradient.js';
import YesButton from './components/Yes.jsx'; 
import NoButton from './components/No.jsx'; 

function App() {
  const canvasRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas');
  }, []);

  // Trigger the carousel slide change via a button click
  const triggerNextSlide = (type) => {
    if (carouselRef.current) {
      carouselRef.current.triggerButtonAction(type);
    }
  };

  return (
    <div className="fullscreen-container">
      <canvas id="gradient-canvas" ref={canvasRef}></canvas>
      <div className="main-zone">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="carousel-container">
          <Carousel ref={carouselRef} />
        </div>
        <div className="button-container">
          <YesButton handleNext={() => triggerNextSlide('like')} />
          <NoButton handleNext={() => triggerNextSlide('dislike')} />
        </div>
      </div>
    </div>
  );
}

export default App;
