import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Carousel from './components/Carousel.jsx';
import YesButton from './components/Yes.jsx'; 
import NoButton from './components/No.jsx'; 
import LayeredDistortion from './components/LayeredDistortion';

import layer1 from './assets/layer-pink4.png';
import layer2 from './assets/layer-red.png';
import layer3 from './assets/layer-purple.png';

function App() {
  const carouselRef = useRef(null);
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);

  const triggerNextSlide = (type) => {
    if (carouselRef.current) {
      carouselRef.current.triggerButtonAction(type);
    }
  };

  // Pass button refs to carousel after they're created
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.setLikeButtonRef?.(yesButtonRef.current);
      carouselRef.current.setDislikeButtonRef?.(noButtonRef.current);
    }
  }, []);

  return (
    <div className="fullscreen-container">
      <div className="distortion-container">
        <LayeredDistortion 
          layers={[
            {
              imageUrl: layer1,
              speed: 0.1,
              volatility: 0.15,
              mouseMovementMultiplier: 0.003,
              opacity: 0.9, 
              zIndex: 0
            },
            {
              imageUrl: layer2,
              speed: 0.2,
              volatility: 0.25,
              mouseMovementMultiplier: 0.005,
              opacity: 0.9,
              zIndex: 1
            },
            {
              imageUrl: layer3,
              speed: 0.3,
              volatility: 0.35,
              mouseMovementMultiplier: 0.002,
              opacity: 0.9,
              zIndex: 2
            }
          ]}
        />
      </div>
      
      <div className="main-zone">
        <div className="carousel-container">
          <Carousel ref={carouselRef} />
        </div>
        <div className="button-container">
          <NoButton ref={noButtonRef} handleNext={() => triggerNextSlide('dislike')} />
          <YesButton ref={yesButtonRef} handleNext={() => triggerNextSlide('like')} />
        </div>
      </div>
    </div>
  );
}

export default App;