import React, { useState, useRef } from 'react';
import adidas from '../assets/images/adidas.png';
import confidence from '../assets/images/confidence.png';
//import couple from '../assets/images/couple.png';
import flower from '../assets/images/flower.png';
import fragile from '../assets/images/fragile.png';
import framboise from '../assets/images/framboise.png';
import hair from '../assets/images/hair.png';
import handi from '../assets/images/handi.png';
import hotdog from '../assets/images/hotdog.png';
import legs from '../assets/images/legs2.png';
import cig from '../assets/images/longlongcig.png';
import manipuladora from '../assets/images/manipuladora.png';
import mardi from '../assets/images/mardi.png';
import mop from '../assets/images/mop.png';
//import meduse from '../assets/images/meduse.png';
import megot from '../assets/images/megot.png';
//import paris from '../assets/images/paris.png';
import petitpois from '../assets/images/petitpois.png';
//import plant from '../assets/images/plant.png';
//import platocombinado from '../assets/images/platocombinado2.png';
//import playboy from '../assets/images/playboy.png';
//import rock from '../assets/images/rocktoppings.png';
import soap from '../assets/images/soap.png';
//import stanley from '../assets/images/stanley.png';
//import max from '../assets/images/stanleymax.png';
//import sun from '../assets/images/sun.png';
//import tin from '../assets/images/tin.png';
//import vrac from '../assets/images/vrac.png';
//import woman from '../assets/images/woman.png'; 

import { CLASSES } from '@splidejs/splide';



function TinderLikeCarousel({ activeIndex, setActiveIndex }) {
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0); // Track the drag offset
  const [dragging, setDragging] = useState(false);
  const carouselRef = useRef(null);
  const threshold = 100; // Minimum swipe distance to trigger slide change

  const handleTouchStart = (e) => {
    setDragging(true);
    setDragStartX(e.touches[0].clientX); // Record the initial touch position
  };

  const handleTouchMove = (e) => {
    if (dragging) {
      const currentX = e.touches[0].clientX;
      setDragOffsetX(currentX - dragStartX); // Calculate the drag distance
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
    if (Math.abs(dragOffsetX) > threshold) {
      if (dragOffsetX < 0) {
        // Swipe left -> next slide
        handleSelect((activeIndex + 1) % 15); // Adjust for number of slides
      } else {
        // Swipe right -> previous slide
        handleSelect((activeIndex - 1 + 15) % 15);
      }
    }
    setDragOffsetX(0); // Reset drag offset after swipe ends
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const getTransformStyle = (index) => {
    if (dragging && activeIndex === index) {
      return {
        transform: `translateX(${dragOffsetX}px)`,
        transition: 'none', // Disable transition while dragging
      };
    } else if (activeIndex === index) {
      return {
        transform: `translateX(0)`,
        transition: 'transform 0.6s ease', // Smooth transition back to normal
      };
    }
    return {
      transform: `translateX(100%)`, // Keep non-active slides off-screen
      transition: 'none', // No transition for non-active slides
    };
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* First Slide */}
        <div
          className="carousel-item-wrapper"
          style={getTransformStyle(0)} // Apply dynamic transform for the first slide
        >
          <img className="carousel-img" src={adidas} alt="Slide 1" />
        </div>
        {/* Second Slide */}
        <div
          className="carousel-item-wrapper"
          style={getTransformStyle(1)} // Apply dynamic transform for the second slide
        >
          <img className="carousel-img" src={confidence} alt="Slide 2" />
        </div>
        {/* Third Slide */}
        <div
          className="carousel-item-wrapper"
          style={getTransformStyle(2)} // Apply dynamic transform for the third slide
        >
          <img className="carousel-img" src={megot} alt="Slide 3" />
        </div>
        {/* Fourth Slide */}
        <div
          className="carousel-item-wrapper"
          style={getTransformStyle(3)} // Apply dynamic transform for the fourth slide
        >
          <img className="carousel-img" src={flower} alt="Slide 4" />
        </div>

        {/* Fifth Slide */}
        <div
          className="carousel-item-wrapper"
          style={getTransformStyle(4)} // Apply dynamic transform for the fourth slide
        >
          <img className="carousel-img" src={fragile} alt="Slide 5" />
        </div>

        {/* Sixth Slide */}
        <div
          className="carousel-item-wrapper"
          style={getTransformStyle(5)} // Apply dynamic transform for the fourth slide
        >
          <img className="carousel-img" src={framboise} alt="Slide 6" />
        </div>

      {/* Seventh Slide */}
      <div
          className="carousel-item-wrapper"
          style={getTransformStyle(6)} 
        >
          <img className="carousel-img" src={hair} alt="Slide 7" />
        </div>

         {/* Eighth Slide */}
      <div
          className="carousel-item-wrapper"
          style={getTransformStyle(7)} 
        >
          <img className="carousel-img" src={handi} alt="Slide 8" />
        </div>
      
      {/* Ninth Slide */}
      <div
          className="carousel-item-wrapper"
          style={getTransformStyle(8)} 
        >
          <img className="carousel-img" src={hotdog} alt="Slide 9" />
        </div>

      {/* Tenth Slide */}
      <div
          className="carousel-item-wrapper"
          style={getTransformStyle(9)} 
        >
          <img className="carousel-img" src={legs} alt="Slide 10" />
        </div>       

      {/* Eleventh Slide */}
      <div
          className="carousel-item-wrapper"
          style={getTransformStyle(10)} 
        >
          <img className="carousel-img" src={petitpois} alt="Slide 11" />
        </div>      

      {/* Twelvth Slide */}
      <div
          className="carousel-item-wrapper"
          style={getTransformStyle(11)} 
        >
          <img className="carousel-img" src={soap} alt="Slide 11" />
        </div>       

       {/* Thirtheenth Slide */}
      <div
          className="carousel-item-wrapper"
          style={getTransformStyle(12)} 
        >
          <img className="carousel-img" src={cig} alt="Slide 13" />
        </div>      
        
         {/* Fourteenth Slide */}
      <div
          className="carousel-item-wrapper"
          style={getTransformStyle(13)} 
        >
          <img className="carousel-img" src={mop} alt="Slide 14" />
        </div>    

          {/* Fifteenth Slide */}
      <div
          className="carousel-item-wrapper"
          style={getTransformStyle(14)} 
        >
          <img className="carousel-img" src={manipuladora} alt="Slide 15" />
        </div>     

      </div>
    </div>
  );
}

export default TinderLikeCarousel;
