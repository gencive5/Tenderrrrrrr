import React, { useState } from 'react';
import ok from '../components/ok.png';

const YesButton = ({ handleNext }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    handleNext();

    // Reset the clicked state after a short delay (e.g., 500ms)
    setTimeout(() => {
      setIsClicked(false);
    }, 700);
  };

  return (
    <button className="yes-button" onClick={handleClick}>
      <img src={ok} className="yes-icon" alt="yes" />
    </button>
  );
};

export default YesButton;
