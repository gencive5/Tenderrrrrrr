import React, { useState, useRef, useEffect } from 'react';
// Images
import couple from '../assets/images/couple.png';
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
import meduse from '../assets/images/meduse.png';
import megot from '../assets/images/megot.png';
import paris from '../assets/images/paris.png';
import petitpois from '../assets/images/petitpois.png';
import plant from '../assets/images/plant.png';
import chico from '../assets/images/chico.png';
import playboy from '../assets/images/playboy.png';
import rock from '../assets/images/rocktoppings.png';
import soap from '../assets/images/soap.png';
import stanley from '../assets/images/stanley.png';
import max from '../assets/images/stanleymax.png';
import sun from '../assets/images/sun.png';
import vrac from '../assets/images/vrac.png';
import woman from '../assets/images/woman.png';
import gel from '../assets/images/gel.png';
import soup from '../assets/images/soup.png';
import shoes from '../assets/images/shoes.png';
import signal from '../assets/images/signal.png';
import rip from '../assets/images/rip.png';
import local from '../assets/images/local.png';
import chair from '../assets/images/chair.png';
import faim from '../assets/images/faim.png';
import tube from '../assets/images/tube.png';
import sunset from '../assets/images/sunset.png';
import spider from '../assets/images/spider.png';
import savon from '../assets/images/savon.png';
import purple from '../assets/images/purple.png';
import melon from '../assets/images/melon.png';
import green from '../assets/images/green.png';
import chaise from '../assets/images/chaise.png';
import car from '../assets/images/car.png';
import amethyst from '../assets/images/amethyst.png';
import treize from '../assets/images/treize.png';
import relax from '../assets/images/relax.png';
import doliprane from '../assets/images/doliprane.png';
import cookie from '../assets/images/cookie.png';
import fitness from '../assets/images/fitness.png';
import cats from '../assets/images/cats.png';
import alien from '../assets/images/alien.png';
import eolienne from '../assets/images/eolienne.png';
import ex from '../assets/images/ex.png';
import ghost from '../assets/images/ghost.png';
import mommy from '../assets/images/mommy2.png';
import normal from '../assets/images/normal.png';
import pal from '../assets/images/pal.png';
import tomatos from '../assets/images/tomatos.png';
import tortilla from '../assets/images/tortilla.png';
import wolves from '../assets/images/wolves.png';
import orange from '../assets/images/orange.png';
import guy from '../assets/images/guy2.png';
import cone from '../assets/images/cone.png';
import aceite from '../assets/images/aceite.png';
import cables from '../assets/images/cables.png';
import carrots from '../assets/images/carrots.png';
import chairs from '../assets/images/chairs.png';
import day from '../assets/images/day.png';
import fraise from '../assets/images/fraise.png';
import papier from '../assets/images/papier.png';
import lime from '../assets/images/lime.png';
import oranges from '../assets/images/oranges.png';
import orb from '../assets/images/orb.png';
import salsa from '../assets/images/salsa.png';
import seau from '../assets/images/seau.png';
import stone from '../assets/images/stone.png';
import tpe from '../assets/images/tpe.png';

import like from '../assets/images/like.svg';
import dislike from '../assets/images/dislike.svg';

function TinderLikeCarousel({ activeIndex, setActiveIndex }) {
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0); // Track the drag offset
  const [dragging, setDragging] = useState(false);
  const [swipeAnimation, setSwipeAnimation] = useState(null); // Animation state
  const [slides, setSlides] = useState([]); // Store randomized slides
  const carouselRef = useRef(null);
  const threshold = 100; // Minimum swipe distance to trigger slide change

  // List of all images
  const imageArray = [
    gel, couple, megot, flower, fragile, framboise, hair, handi, hotdog, legs,
    petitpois, soap, cig, mop, manipuladora, rock, sun, max, vrac, woman, playboy,
    stanley, plant, chico, meduse, paris, mardi, soup, shoes, signal,
    rip, faim, local, chair, tube, sunset, spider, savon, purple, melon,
    green, chaise, car, amethyst, treize, relax, doliprane, cookie, fitness,
    cats, alien, eolienne, ex, ghost, mommy, normal, pal, tomatos, tortilla, wolves, 
    orange, guy, cone, aceite, cables, carrots, chairs, day, fraise, papier, lime, oranges, orb, salsa, seau, stone, tpe, 
  ];

  // Function to shuffle an array
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Shuffle slides on initial render
  useEffect(() => {
    setSlides(shuffleArray(imageArray));
  }, []);

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
        // Swipe left -> dislike animation
        triggerAnimation('dislike');
        handleSelect((activeIndex + 1) % slides.length);
      } else {
        // Swipe right -> like animation
        triggerAnimation('like');
        handleSelect((activeIndex - 1 + slides.length) % slides.length);
      }
    }
    setDragOffsetX(0); // Reset drag offset after swipe ends
  };

  const triggerAnimation = (type) => {
    setSwipeAnimation(type);
    setTimeout(() => setSwipeAnimation(null), 600); // Remove animation after 600ms
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
        transform: 'translateX(0)',
        transition: 'transform 0.6s ease', // Smooth transition back to normal
      };
    }
    return {
      transform: 'translateX(100%)', // Keep non-active slides off-screen
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
        {slides.map((imgSrc, index) => (
          <div
            key={index}
            className="carousel-item-wrapper"
            style={getTransformStyle(index)}
          >
            <img className="carousel-img" src={imgSrc} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      {swipeAnimation && (
        <div
          className={`swipe-animation ${
            swipeAnimation === 'like' ? 'like-animation' : 'dislike-animation'
          }`}
        >
          <img
            src={swipeAnimation === 'like' ? like : dislike}
            alt={swipeAnimation}
            className="swipe-img"
          />
        </div>
      )}
    </div>
  );
}

export default TinderLikeCarousel;
