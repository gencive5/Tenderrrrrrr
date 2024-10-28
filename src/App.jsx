import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from './components/FirstCarousel.jsx';
import logo from './assets/images/logo.svg';
import { Gradient } from './components/Gradient.js';
import YesButton from './components/Yes.jsx'; 
import NoButton from './components/No.jsx'; 

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(true);
  
  const canvasRef = useRef(null);


  // Initialize gradient
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas');
  }, []);

  // Handle scroll and keyboard events for slide changes
  useEffect(() => {
    if (window.innerWidth > 768) {
      let scrollTimeout;

      const handleScroll = (event) => {
        if (!canScroll) return;

        clearTimeout(scrollTimeout);
        setCanScroll(false);

        const delta = Math.sign(event.deltaY);
        const newIndex = (activeIndex + delta + 4) % 4;

        setActiveIndex(newIndex);

        scrollTimeout = setTimeout(() => {
          setCanScroll(true);
        }, 500);
      };

      const handleKeydown = (event) => {
        if (!canScroll) return;

        if (event.key === 'ArrowUp') {
          handlePrevious();
        } else if (event.key === 'ArrowDown') {
          handleNext();
        }
      };

      window.addEventListener('wheel', handleScroll);
      window.addEventListener('keydown', handleKeydown);

      return () => {
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [activeIndex, canScroll]);

  const handlePrevious = () => {
    const newActiveIndex = activeIndex === 0 ? 3 : activeIndex - 1;
    setActiveIndex(newActiveIndex);
  };

  const handleNext = () => {
    const newActiveIndex = (activeIndex + 1) % 4;
    setActiveIndex(newActiveIndex);
  };

 


  return (
    <Container fluid className="custom-container">
      <Row className="no-gutters">
        <Col sm={12} md={8} className="col-first">
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

            
        </Col>
        <Col sm={12} md={4} className="col-second">
          <canvas id="gradient-canvas" ref={canvasRef}></canvas>
        </Col>
      </Row>
      
    </Container>
  );
}

export default App;
