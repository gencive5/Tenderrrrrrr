import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import cross from '../components/dislikenew.png';

const FizzParticle = ({ id, onComplete, startPosition, intensity = 1, isFinal = false }) => {
  const intensityScale = Math.min(1, Math.max(0, intensity));
  
  const distanceMultiplier = 0.5 + intensityScale * 1.5;
  const sizeMultiplier = 0.6 + intensityScale * 0.9;
  const speedMultiplier = 0.6 + intensityScale * 0.4;
  
  const angle = Math.random() * Math.PI * 2;
  const distance = (15 + Math.random() * 60) * distanceMultiplier;
  const xOffset = Math.cos(angle) * distance * (Math.random() > 0.5 ? 1 : -1);
  const yOffset = (-40 - Math.random() * 80) * (0.5 + intensityScale * 0.8);
  
  const size = (15 + Math.random() * 30) * sizeMultiplier;
  const rotation = Math.random() * 360;
  const duration = (0.4 + Math.random() * 0.5) / speedMultiplier;
  const delay = Math.random() * 0.1;
  
  return (
    <div
      style={{
        position: 'fixed',
        top: startPosition.y,
        left: startPosition.x,
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: 'none',
        zIndex: 1000,
        transform: 'translate(-50%, -50%)',
        animation: `fizzFloat ${duration}s ease-out ${delay}s forwards`,
        '--x-offset': `${xOffset}px`,
        '--y-offset': `${yOffset}px`,
      }}
      onAnimationEnd={() => onComplete(id)}
    >
      <img 
        src={cross} 
        alt="fizz" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `rotate(${rotation}deg) scale(0.8)`,
          animation: `fizzBubble ${duration}s ease-out ${delay}s forwards`,
          opacity: 0.6 + intensityScale * 0.4,
        }}
      />
    </div>
  );
};

const NoButton = forwardRef(({ handleNext }, ref) => {
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState([]);
  const [nextParticleId, setNextParticleId] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const animationTimeoutRef = useRef(null);

  const getButtonCenter = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
    return { x: 0, y: 0 };
  };

  const createFizzParticles = (intensity = 1, isFinal = false) => {
    const position = getButtonCenter();
    setButtonPosition(position);
    
    // Clear previous progressive particles to prevent stacking
    if (!isFinal) {
      setParticles(prev => prev.filter(p => !p.isFinal));
    }
    
    let particleCount;
    if (isFinal) {
      particleCount = 20; // Final burst when swipe completes or button clicked
    } else {
      // Progressive during swipe: scales from 3 to 11 particles based on intensity
      particleCount = Math.floor(3 + intensity * 8);
    }
    
    const newParticles = [];
    const timestamp = Date.now();
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: `${timestamp}-${nextParticleId + i}-${Math.random()}`,
        intensity: intensity,
        isFinal: isFinal,
      });
    }
    
    setParticles(prev => {
      // Replace progressive particles with new ones, keep final burst particles
      if (!isFinal) {
        return [...prev.filter(p => p.isFinal), ...newParticles];
      }
      return [...prev, ...newParticles];
    });
    
    setNextParticleId(prev => prev + particleCount);
    
    // Clear previous timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    // Remove particles after animation completes
    animationTimeoutRef.current = setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 800);
  };

  const triggerSwipeFizz = (intensity, isFinal = false) => {
    if (!buttonRef.current) return;
    createFizzParticles(intensity, isFinal);
  };

  const handleClick = () => {
    if (isClicked) return;
    
    setIsClicked(true);
    triggerSwipeFizz(1, true);
    handleNext();

    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  const removeParticle = (id) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  };

  useImperativeHandle(ref, () => ({
    triggerSwipeFizz,
  }));

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={buttonRef}>
      <button 
        className="no-button" 
        onClick={handleClick}
        disabled={isClicked}
        style={{
          animation: isClicked ? 'buttonPop 0.3s ease' : 'none',
        }}
      >
        <img src={cross} className="no-icon" alt="no" />
      </button>
      
      {particles.map(particle => (
        <FizzParticle 
          key={particle.id} 
          id={particle.id} 
          onComplete={removeParticle}
          startPosition={buttonPosition}
          intensity={particle.intensity}
          isFinal={particle.isFinal}
        />
      ))}
    </div>
  );
});

export default NoButton;