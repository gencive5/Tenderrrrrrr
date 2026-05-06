import React, { useState, useRef } from 'react';
import ok from '../components/like.png';

const FizzParticle = ({ id, onComplete, startPosition }) => {
  // Random position offset from button center
  const angle = Math.random() * Math.PI * 2;
  const distance = 15 + Math.random() * 60;
  const xOffset = Math.cos(angle) * distance * (Math.random() > 0.5 ? 1 : -1);
  const yOffset = -40 - Math.random() * 80; // upward direction
  
  // Random size variation
  const size = 20 + Math.random() * 25;
  
  // Random rotation
  const rotation = Math.random() * 360;
  
  // Random animation duration
  const duration = 0.5 + Math.random() * 0.6;
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
          opacity: 0.9,
        }}
      />
    </div>
  );
};

const YesButton = ({ handleNext }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState([]);
  const [nextParticleId, setNextParticleId] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

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

  const createFizzParticles = () => {
    const position = getButtonCenter();
    setButtonPosition(position);
    
    const particleCount = 12; // Number of mini like.png bubbles
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: nextParticleId + i,
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    setNextParticleId(prev => prev + particleCount);
    
    // Remove particles after animation completes
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 1200);
  };

  const handleClick = () => {
    if (isClicked) return;
    
    setIsClicked(true);
    createFizzParticles();
    handleNext();

    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  const removeParticle = (id) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  };

  // Inject keyframe animations
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes fizzFloat {
        0% {
          transform: translate(-50%, -50%) translate(0, 0) scale(1);
          opacity: 1;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) translate(var(--x-offset, 0px), var(--y-offset, -50px)) scale(0.3);
          opacity: 0;
        }
      }
      
      @keyframes fizzBubble {
        0% {
          transform: rotate(var(--rotation, 0deg)) scale(0.5);
          opacity: 0;
        }
        30% {
          transform: rotate(var(--rotation, 0deg)) scale(1.2);
          opacity: 1;
        }
        100% {
          transform: rotate(calc(var(--rotation, 0deg) + 180deg)) scale(0.4);
          opacity: 0;
        }
      }
      
      @keyframes buttonPop {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(0.9);
        }
        100% {
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

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
      
      {/* Fizz particles - mini like.png images */}
      {particles.map(particle => (
        <FizzParticle 
          key={particle.id} 
          id={particle.id} 
          onComplete={removeParticle}
          startPosition={buttonPosition}
        />
      ))}
    </div>
  );
};

export default YesButton;