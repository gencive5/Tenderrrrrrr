import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import ok from '../components/likenew.png';

const FizzParticle = ({ id, onComplete, startPosition, intensity = 1, isFinal = false }) => {
  // Scale particle behavior based on intensity (0-1)
  const intensityScale = Math.min(1, Math.max(0, intensity));
  
  // More intense = larger particles, more spread out
  const distanceMultiplier = 0.5 + intensityScale * 1.5;
  const sizeMultiplier = 0.6 + intensityScale * 0.9;
  const speedMultiplier = 0.2 + intensityScale * 0.2;
  
  const angle = Math.random() * Math.PI * 2;
  const distance = (15 + Math.random() * 60) * distanceMultiplier;
  const xOffset = Math.cos(angle) * distance * (Math.random() > 0.5 ? 1 : -1);
  const yOffset = (10 - Math.random() * 400) * (0.5 + intensityScale * 0.8);
  
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
        src={ok} 
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

const YesButton = forwardRef(({ handleNext }, ref) => {
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState([]);
  const [nextParticleId, setNextParticleId] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const lastIntensityRef = useRef(0);

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
    
    // Scale particle count based on intensity - progressive
    let particleCount;
    if (isFinal) {
      particleCount = 12; // Final burst when swipe completes or button clicked
    } else {
      // Progressive: 2-18 particles based on intensity (0-1)
      particleCount = Math.floor(2 + intensity * 6);
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
    
    setParticles(prev => [...prev, ...newParticles]);
    setNextParticleId(prev => prev + particleCount);
    
    // Clear previous timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    // Remove particles after animation completes
    animationTimeoutRef.current = setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 1000);
  };

  // Method to trigger fizz from swipe
  const triggerSwipeFizz = (intensity, isFinal = false) => {
    if (!buttonRef.current) return;
    
    // Store the intensity for reference
    lastIntensityRef.current = intensity;
    
    // Always create particles with the current intensity
    // No throttling - we want smooth progressive fizz during swipe
    createFizzParticles(intensity, isFinal);
  };

  const handleClick = () => {
    if (isClicked) return;
    
    setIsClicked(true);
    triggerSwipeFizz(1, true); // Full intensity on click with final burst
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
        className="yes-button" 
        onClick={handleClick}
        disabled={isClicked}
        style={{
          animation: isClicked ? 'buttonPop 0.3s ease' : 'none',
        }}
      >
        <img src={ok} className="yes-icon" alt="yes" />
      </button>
      
      {/* Fizz particles */}
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

export default YesButton;