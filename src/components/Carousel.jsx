import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef, useCallback } from 'react';

// Images (all your imports remain the same)
import couple from '../assets/images/couple.webp';
import flower from '../assets/images/flower.webp';
import fragile from '../assets/images/fragile.webp';
import framboise from '../assets/images/framboise.webp';
import hair from '../assets/images/hair.webp';
import handi from '../assets/images/handi.webp';
import hotdog from '../assets/images/hotdog.webp';
import manipuladora from '../assets/images/manipuladora.webp';
import mop from '../assets/images/mop.webp';
import paris from '../assets/images/paris.webp';
import petitpois from '../assets/images/petitpois.webp';
import plant from '../assets/images/plant.webp';
import chico from '../assets/images/chico.webp';
import playboy from '../assets/images/playboy.webp';
import soap from '../assets/images/soap.webp';
import sun from '../assets/images/sun.webp';
import woman from '../assets/images/woman.webp';
import gel from '../assets/images/gel.webp';
import soup from '../assets/images/soup.webp';
import shoes from '../assets/images/shoes.webp';
import signal from '../assets/images/signal.webp';
import local from '../assets/images/local.webp';
import chair from '../assets/images/chair.webp';
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
import spongedaddy from '../assets/images/spongedaddy.webp';
import sport from '../assets/images/sport.webp';
import tortina from '../assets/images/tortina.webp';
import tartepommes from '../assets/images/tartepommes.webp';
import singe from '../assets/images/singe.webp';
import salade from '../assets/images/salade.webp';
import sink from '../assets/images/sink.webp';
import relax2 from '../assets/images/relax2.webp';
import robot from '../assets/images/robot.webp';
import plage from '../assets/images/plage.webp';
import rainbow from '../assets/images/rainbow.webp';
import plaque from '../assets/images/plaque.webp';
import poubelle2 from '../assets/images/poubelle2.webp';
import parebrise from '../assets/images/parebrise.webp';
import passoire from '../assets/images/passoire.webp';
import nutriscore from '../assets/images/nutriscore.webp';
import nevermind from '../assets/images/nevermind.webp';
import magnets from '../assets/images/magnets.webp';
import megot from '../assets/images/megot.webp';
import mcqueen from '../assets/images/mcqueen.webp';
import moto from '../assets/images/moto.webp';
import lustre from '../assets/images/lustre.webp';
import lavaverte from '../assets/images/lavaverte.webp';
import lavarouge from '../assets/images/lavarouge.webp';
import jelly from '../assets/images/jelly.webp';
import kaki from '../assets/images/kaki.webp';
import jackdaniels from '../assets/images/jackdaniels.webp';
import gratis from '../assets/images/gratis.webp';
import girlboss from '../assets/images/girlboss.webp';
import fashion from '../assets/images/fashion.webp';
import fraiche from '../assets/images/fraiche.webp';
import faucet from '../assets/images/faucet.webp';
import fraise2 from '../assets/images/fraise2.webp';
import flixbus from '../assets/images/flixbus.webp';
import fall2 from '../assets/images/fall2.webp';
import evian from '../assets/images/evian.webp';
import dyson from '../assets/images/dyson.webp';
import enchufe from '../assets/images/enchufe.webp';
import cookies from '../assets/images/cookies.webp';
import chose from '../assets/images/chose.webp';
import coneclou from '../assets/images/coneclou.webp';
import candyup from '../assets/images/candyup.webp';
import chocolatona from '../assets/images/chocolatona.webp';
import chaussure from '../assets/images/chaussure.webp';
import bibimmyeon from '../assets/images/bibimmyeon.webp';
import bettina from '../assets/images/bettina.webp';
import usb from '../assets/images/usb.webp';
import vodka from '../assets/images/vodka.webp';
import aniosafe from '../assets/images/aniosafe.webp';
import voiture from '../assets/images/voiture.webp';
import burger from '../assets/images/burger.webp';
import ananas from '../assets/images/ananas.webp';
import basque from '../assets/images/basque.webp';
import biscuits from '../assets/images/biscuits.webp';
import brule from '../assets/images/brule.webp';
import camera from '../assets/images/camera.webp';
import chaine from '../assets/images/chaine.webp';
import ciseaux from '../assets/images/ciseaux.webp';
import coeur from '../assets/images/coeur.webp';
import cookie2 from '../assets/images/cookie2.webp';
import coupant from '../assets/images/coupant.webp';
import fantomes from '../assets/images/fantomes.webp';
import fauteuilnoir from '../assets/images/fauteuilnoir.webp';
import fauteuilsrouges from '../assets/images/fauteuilsrouges.webp';
import fruity from '../assets/images/fruity.webp';
import groupe from '../assets/images/groupe.webp';
import guyhoquet from '../assets/images/guyhoquet.webp';
import hortensia from '../assets/images/hortensia.webp';
import icecreamtruck from '../assets/images/icecreamtruck.webp';
import jaune from '../assets/images/jaune.webp';
import monstrecookie from '../assets/images/monstrecookie.webp';
import pancakes from '../assets/images/pancakes.webp';
import plateau from '../assets/images/plateau.webp';
import pommes from '../assets/images/pommes.webp';
import radiateur from '../assets/images/radiateur.webp';
import rosiers from '../assets/images/rosiers.webp';
import sacpoubelle from '../assets/images/sacpoubelle.webp';
import siempre from '../assets/images/siempre.webp';
import tablevoile from '../assets/images/tablevoile.webp';
import tigres from '../assets/images/tigres.webp';
import tortue from '../assets/images/tortue.webp';
import tournesol from '../assets/images/tournesol.webp';
import tranche from '../assets/images/tranche.webp';
import tube2 from '../assets/images/tube2.webp';
import vanille from '../assets/images/vanille.webp';
import velo from '../assets/images/velo.webp';
import verre from '../assets/images/verre.webp';
import voitures from '../assets/images/voitures.webp';
import matelas from '../assets/images/matelas.webp';
import tubesverts from '../assets/images/tubesverts.webp';

const Carousel = forwardRef((props, ref) => {
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [swipeAnimation, setSwipeAnimation] = useState(null);
  const [slides, setSlides] = useState([]);
  const [failedImages, setFailedImages] = useState(new Set());
  const threshold = 100;
  const likeButtonRef = useRef(null);
  const dislikeButtonRef = useRef(null);
  const currentIntensityRef = useRef({ like: 0, dislike: 0 });
  const animationFrameRef = useRef(null);
  const allImagesRef = useRef([]);
  const currentBatchEndRef = useRef(0);
  
  const BATCH_SIZE = 15;

  // Complete image array with all your images
  const completeImageArray = [
    gel, couple, flower, fragile, framboise, hair, handi, hotdog,
    petitpois, soap, mop, manipuladora, sun, woman, playboy,
    stanley, plant, chico, paris, soup, shoes, signal,
    local, chair, tube, sunset, spider, savon, purple, melon,
    green, chaise, car, amethyst, treize, relax, doliprane, cookie, cats,
    eolienne, ex, ghost, mommy, normal, pal, tomatos, tortilla, wolves,
    orange, guy, cone, cables, carrots, chairs, fraise, papier, lime, oranges,
    orb, salsa, seau, tpe, girl, brain, danette, diesel, girlstop, fall, ice,
    jellyblue, jellypink, leopard, lush, pearls, pole, rolex, tin, spray, trays,
    truck, tapis, pantoufles, crakeo, lundi, kim, spongedaddy, sport, tortina, tartepommes,
    singe, salade, sink, relax2, robot, plage, rainbow, plaque, poubelle2, parebrise, passoire, 
    nutriscore, nevermind, magnets, megot, mcqueen, moto, lustre, lavaverte, lavarouge, jelly, kaki,
    jackdaniels, gratis, girlboss, fashion, fraiche, faucet, fraise2, flixbus, fall2, evian,
    dyson, enchufe, cookies, chose, coneclou, candyup, chocolatona, chaussure, burger, bibimmyeon, bettina,
    usb, vodka, aniosafe, voiture, ananas, basque, biscuits, brule, camera, chaine, ciseaux, coeur,
    cookie2, coupant, 
    fantomes, fauteuilnoir, fauteuilsrouges, fruity, groupe, guyhoquet, hortensia,
    icecreamtruck, jaune, monstrecookie, pancakes, plateau, pommes,
    radiateur, rosiers, sacpoubelle, siempre, tablevoile, tigres, tortue, tournesol, tranche, tube2, vanille,
    velo, verre, voitures, matelas, tubesverts
  ];

  // Filter out any undefined or null images
  const validImageArray = completeImageArray.filter(img => img !== undefined && img !== null);

  console.log('Total valid images:', validImageArray.length);
  console.log('First few images:', validImageArray.slice(0, 5));

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Load more images when needed
  const loadMoreImages = useCallback(() => {
    const nextBatch = allImagesRef.current.slice(
      currentBatchEndRef.current, 
      currentBatchEndRef.current + BATCH_SIZE
    );
    
    if (nextBatch.length > 0) {
      setSlides(prev => [...prev, ...nextBatch]);
      currentBatchEndRef.current += BATCH_SIZE;
    }
  }, []);

  // Initialize - shuffle all images but only load first batch
  useEffect(() => {
    if (validImageArray.length === 0) {
      console.error('No valid images found!');
      return;
    }
    const shuffled = shuffleArray(validImageArray);
    allImagesRef.current = shuffled;
    const firstBatch = shuffled.slice(0, BATCH_SIZE);
    setSlides(firstBatch);
    currentBatchEndRef.current = BATCH_SIZE;
  }, []);

  const handleNextSlide = () => {
    setSlides((prevSlides) => {
      const newSlides = prevSlides.slice(1);
      
      // Load more when we have less than 10 images left
      if (newSlides.length < 10 && currentBatchEndRef.current < allImagesRef.current.length) {
        loadMoreImages();
      }
      
      return newSlides;
    });
  };

  // Handle image load errors
  const handleImageError = (imgSrc, index) => {
    console.error(`Failed to load image: ${imgSrc}`);
    setFailedImages(prev => new Set(prev).add(imgSrc));
    
    // Optionally: remove failed image and skip to next
    setTimeout(() => {
      setSlides(prev => {
        if (prev[index] === imgSrc) {
          const newSlides = [...prev];
          newSlides.splice(index, 1);
          return newSlides;
        }
        return prev;
      });
    }, 100);
  };

  const handleTouchStart = (e) => {
    setDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffsetX(0);
    currentIntensityRef.current = { like: 0, dislike: 0 };
  };

  const handleTouchMove = (e) => {
    if (dragging) {
      const currentX = e.touches[0].clientX;
      const offset = currentX - dragStartX;
      setDragOffsetX(offset);
      
      const intensity = Math.min(1, Math.abs(offset) / threshold);
      const type = offset > 0 ? 'like' : 'dislike';
      const oppositeType = offset > 0 ? 'dislike' : 'like';
      
      if (currentIntensityRef.current[oppositeType] > 0) {
        currentIntensityRef.current[oppositeType] = 0;
      }
      
      const intensityChanged = Math.abs(intensity - currentIntensityRef.current[type]) > 0.05;
      
      if (intensityChanged && intensity > 0.05) {
        currentIntensityRef.current[type] = intensity;
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        animationFrameRef.current = requestAnimationFrame(() => {
          if (offset > 0) {
            likeButtonRef.current?.triggerSwipeFizz(intensity);
          } else if (offset < 0) {
            dislikeButtonRef.current?.triggerSwipeFizz(intensity);
          }
        });
      }
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
    const intensity = Math.min(1, Math.abs(dragOffsetX) / threshold);
    
    if (Math.abs(dragOffsetX) > threshold) {
      const type = dragOffsetX < 0 ? 'dislike' : 'like';
      
      if (type === 'like') {
        likeButtonRef.current?.triggerSwipeFizz(1, true);
      } else {
        dislikeButtonRef.current?.triggerSwipeFizz(1, true);
      }
      
      triggerAnimation(type);
      handleNextSlide();
    }
    setDragOffsetX(0);
  };

  const triggerAnimation = (type) => {
    setSwipeAnimation(type);
    setTimeout(() => setSwipeAnimation(null), 600);
  };

  const triggerButtonAction = (type) => {
    triggerAnimation(type);
    if (type === 'like') {
      likeButtonRef.current?.triggerSwipeFizz(1, true);
    } else {
      dislikeButtonRef.current?.triggerSwipeFizz(1, true);
    }
    handleNextSlide();
  };

  useImperativeHandle(ref, () => ({
    triggerButtonAction,
    setLikeButtonRef: (btnRef) => { likeButtonRef.current = btnRef; },
    setDislikeButtonRef: (btnRef) => { dislikeButtonRef.current = btnRef; },
  }));

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
      <div
        className="carousel-container"
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
            <img 
              className="carousel-img" 
              src={imgSrc} 
              alt={`Slide ${index + 1}`}
              onError={() => handleImageError(imgSrc, index)}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default Carousel;