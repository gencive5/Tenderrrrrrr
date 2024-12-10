import React, { useState } from 'react';

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
      <svg
        className={`no-icon ${isClicked ? 'clicked' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 194.5 194.5"
        width="40"
        height="40"
      >
        <circle className="no-path" cx="97.25" cy="97.25" r="95.25" />
        <rect className="no-path" x="55.65" y="83.38" width="106.7" height="36.17" />
      </svg>
    </button>
  );
};

export default NoButton;
