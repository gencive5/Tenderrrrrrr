import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Carousel from './components/Carousel.jsx';
import logo from './assets/images/logooutline.svg';
import YesButton from './components/Yes.jsx'; 
import NoButton from './components/No.jsx'; 
import LayeredDistortion from './components/LayeredDistortion';
// import SimpleAnimatedGradient from './components/SimpleAnimatedGradient';
// import { Gradient } from './components/Gradient.js';

import layer1 from './assets/layer-pink2.png';
import layer2 from './assets/layer-red2.png';
import layer3 from './assets/layer-purple.png';

function App() {
  const carouselRef = useRef(null);


  const triggerNextSlide = (type) => {
    if (carouselRef.current) {
      carouselRef.current.triggerButtonAction(type);
    }
  };

  return (
    <div className="fullscreen-container">
     
      {/* <SimpleAnimatedGradient/> */}
      
      {/* Distortion Layers */}
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
        {/* <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div> */}
        <div className="carousel-container">
          <Carousel ref={carouselRef} />
        </div>
        <div className="button-container">
          <NoButton handleNext={() => triggerNextSlide('dislike')} />
          <YesButton handleNext={() => triggerNextSlide('like')} />
          
        </div>
      </div>
    </div>
  );
}

export default App;