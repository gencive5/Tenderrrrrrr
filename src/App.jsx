import React, { useState, useEffect, useRef } from 'react';
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
  const canvasRef = useRef(null);

  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas');
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  return (
    <Container fluid className="custom-container">
      <Row className="no-gutters">
        <Col sm={12} md={8} className="col-first">
          
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
        </Col>
        <Col sm={12} md={4} className="col-second">
          {/* Leave the second column empty for now or add other content */}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
