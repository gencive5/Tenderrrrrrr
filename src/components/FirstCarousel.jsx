import React, { useState, useRef, useEffect } from 'react';
// Images
import couple from '../assets/images/couple.webp';
import flower from '../assets/images/flower.webp';
import fragile from '../assets/images/fragile.webp';
import framboise from '../assets/images/framboise.webp';
import hair from '../assets/images/hair.webp';
import handi from '../assets/images/handi.webp';
import hotdog from '../assets/images/hotdog.webp';
import cig from '../assets/images/longlongcig.webp';
import manipuladora from '../assets/images/manipuladora.webp';
import mop from '../assets/images/mop.webp';
import megot from '../assets/images/megot.webp';
import paris from '../assets/images/paris.webp';
import petitpois from '../assets/images/petitpois.webp';
import plant from '../assets/images/plant.webp';
import chico from '../assets/images/chico.webp';
import playboy from '../assets/images/playboy.webp';
import soap from '../assets/images/soap.webp';
import max from '../assets/images/stanleymax.webp';
import sun from '../assets/images/sun.webp';
import woman from '../assets/images/woman.webp';
import gel from '../assets/images/gel.webp';
import soup from '../assets/images/soup.webp';
import shoes from '../assets/images/shoes.webp';
import signal from '../assets/images/signal.webp';
import rip from '../assets/images/rip.webp';
import local from '../assets/images/local.webp';
import chair from '../assets/images/chair.webp';
import faim from '../assets/images/faim.webp';
import tube from '../assets/images/tube.webp';
import sunset from '../assets/images/sunset.webp';
import spider from '../assets/images/spider.webp';
import savon from '../assets/images/savon.webp';
import purple from '../assets/images/purple.webp';
import melon from '../assets/images/melon.webp';
import green from '../assets/images/green.webp';
import chaise from '../assets/images/chaise.webp';
import car from '../assets/images/car.webp';
import amethyst from '../assets/images/amethyst.webp';
import treize from '../assets/images/treize.webp';
import relax from '../assets/images/relax.webp';
import doliprane from '../assets/images/doliprane.webp';
import cookie from '../assets/images/cookie.webp';
import cats from '../assets/images/cats.webp';
import eolienne from '../assets/images/eolienne.webp';
import ex from '../assets/images/ex.webp';
import ghost from '../assets/images/ghost.webp';
import mommy from '../assets/images/mommy.webp';
import normal from '../assets/images/normal.webp';
import pal from '../assets/images/pal.webp';
import tomatos from '../assets/images/tomatos.webp';
import tortilla from '../assets/images/tortilla.webp';
import wolves from '../assets/images/wolves.webp';
import orange from '../assets/images/orange.webp';
import guy from '../assets/images/guy2.webp';
import cone from '../assets/images/cone.webp';
import aceite from '../assets/images/aceite.webp';
import cables from '../assets/images/cables.webp';
import carrots from '../assets/images/carrots.webp';
import chairs from '../assets/images/chairs.webp';
import fraise from '../assets/images/fraise.webp';
import papier from '../assets/images/papier.webp';
import lime from '../assets/images/lime.webp';
import oranges from '../assets/images/oranges.webp';
import orb from '../assets/images/orb.webp';
import salsa from '../assets/images/salsa.webp';
import seau from '../assets/images/seau.webp';
import stone from '../assets/images/stone.webp';
import tpe from '../assets/images/tpe.webp';
import girl from '../assets/images/girl.webp';
import stanley from '../assets/images/stanleymax.webp';
import brain from '../assets/images/brain.webp';
import danette from '../assets/images/danette.webp';
import diesel from '../assets/images/diesel.webp';
import fall from '../assets/images/fall.webp';
import girlstop from '../assets/images/girlstop.webp';
import ice from '../assets/images/ice.webp';
import jellyblue from '../assets/images/jellyblue.webp';
import jellypink from '../assets/images/jellypink.webp';
import lavablue from '../assets/images/lavablue.webp';
import leopard from '../assets/images/leopard.webp';
import lush from '../assets/images/lush.webp';
import pearls from '../assets/images/pearls.webp';
import pole from '../assets/images/pole.webp';
import rolex from '../assets/images/rolex.webp';
import spray from '../assets/images/spray.webp';
import tin from '../assets/images/tin.webp';
import trays from '../assets/images/trays.webp';
import truck from '../assets/images/truckcoquette.webp';
import tapis from '../assets/images/tapis.webp';
import pantoufles from '../assets/images/pantoufles.webp';
import kim from '../assets/images/kim.webp';
import lundi from '../assets/images/lundi.webp';
import crakeo from '../assets/images/crakeo.webp';

import like from '../assets/images/like.svg';
import dislike from '../assets/images/dislike.svg';

function TinderLikeCarousel() {
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [swipeAnimation, setSwipeAnimation] = useState(null);
  const [slides, setSlides] = useState([]);
  const carouselRef = useRef(null);
  const threshold = 100;

  const imageArray = [
    gel, couple, megot, flower, fragile, framboise, hair, handi, hotdog,
    petitpois, soap, cig, mop, manipuladora, sun, max, woman, playboy,
    stanley, plant, chico, paris, soup, shoes, signal,
    rip, faim, local, chair, tube, sunset, spider, savon, purple, melon,
    green, chaise, car, amethyst, treize, relax, doliprane, cookie, cats,
    eolienne, ex, ghost, mommy, normal, pal, tomatos, tortilla, wolves,
    orange, guy, cone, aceite, cables, carrots, chairs, fraise, papier, lime, oranges,
    orb, salsa, seau, stone, tpe, girl, brain, danette, diesel, girlstop, fall, ice,
    jellyblue, jellypink, lavablue, leopard, lush, pearls, pole, rolex, tin, spray, trays,
    truck, tapis, pantoufles, crakeo, lundi, kim,
  ];

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  useEffect(() => {
    setSlides(shuffleArray(imageArray));
  }, []);

  const handleTouchStart = (e) => {
    setDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (dragging) {
      const currentX = e.touches[0].clientX;
      setDragOffsetX(currentX - dragStartX);
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
    if (Math.abs(dragOffsetX) > threshold) {
      triggerAnimation(dragOffsetX < 0 ? 'dislike' : 'like');
      setSlides((prevSlides) => prevSlides.slice(1));
    }
    setDragOffsetX(0);
  };

  const triggerAnimation = (type) => {
    setSwipeAnimation(type);
    setTimeout(() => setSwipeAnimation(null), 600);
  };

  const getTransformStyle = (index) => {
    if (dragging && index === 0) {
      return { transform: `translateX(${dragOffsetX}px)`, transition: 'none' };
    } else if (index === 0) {
      return { transform: 'translateX(0)', transition: 'transform 0.6s ease' };
    }
    return { transform: 'translateX(100%)', transition: 'none' };
  };

  return (
    <div className="carousel-wrapper">
      {/* Swipe animation placed outside of the carousel */}
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

      {/* Carousel */}
      <div
        className="carousel-container"
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
    </div>
  );
}

export default TinderLikeCarousel;
