import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Carousel from './components/FirstCarousel.jsx';
import logo from './assets/images/logooutline.svg';
import YesButton from './components/Yes.jsx'; 
import NoButton from './components/No.jsx'; 
import LayeredDistortion from './components/LayeredDistortion';
import { Gradient } from './components/Gradient.js';
// Import your PNG layers - create these in your assets/images/
import layer1 from './assets/layer-pink.png';
import layer2 from './assets/layer-red.png';
import layer3 from './assets/layer-purple.png';

function App() {
  const canvasRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas');
  }, []);

  const triggerNextSlide = (type) => {
    if (carouselRef.current) {
      carouselRef.current.triggerButtonAction(type);
    }
  };

  return (
    <div className="fullscreen-container">
      {/* Background Gradient - stays at bottom */}
      <canvas id="gradient-canvas" ref={canvasRef}></canvas>
      
      {/* Distortion Layers - between gradient and content */}
      <div className="distortion-container">
        <LayeredDistortion 
          layers={[
            {
              imageUrl: layer1,
              speed: 0.3,
              volatility: 0.15,
              mouseMovementMultiplier: 0.005,
              opacity: 0.9, 
              
              zIndex: 0
            },
            {
              imageUrl: layer2,
              speed: 0.6,
              volatility: 0.25,
              mouseMovementMultiplier: 0.015,
              opacity: 0.9,
              zIndex: 1
            },
            {
              imageUrl: layer3,
              speed: 1.0,
              volatility: 0.35,
              mouseMovementMultiplier: 0.03,
              opacity: 0.9,
              zIndex: 2
            }
          ]}
        />
      </div>
      
      {/* Main Content - kept exactly as you have it */}
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