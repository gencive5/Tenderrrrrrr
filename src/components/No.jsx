import React, { useState } from 'react';
import cross from '../components/cross.png';

const NoButton = ({ handleNext }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    handleNext();

    // Reset the clicked state after a short delay (e.g., 500ms)
    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  return (
    <button className="no-button" onClick={handleClick}>
       <img src={cross} className="no-icon" alt="no" />
    </button>
  );
};

export default NoButton;
