import React, { useState } from 'react';

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
      <svg
        className={`yes-icon ${isClicked ? 'clicked' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 152.77 160.02"
        width="40"
        height="40"
      >
        <path
          className="yes-path"
          d="M82.59,160c-13.62.11-26.06-9.59-36.86-19.42-11.82-10.76-21.57-22.69-31.48-35.21C8.47,98.08,3.19,90.09.94,81.05-3.33,63.89,7.2,44.7,26.56,45.51,41.15,46.12,53.93,59.87,68.91,56,79.74,53.16,85.44,41.74,91.45,32.3c8.2-12.87,21.3-27.4,36.61-31.5,7.92-2.13,17.6-.07,21.86,6.94,1.93,3.17,2.55,7,2.76,10.68,1.09,19.82-8.06,38.11-13.46,56.67a355.23,355.23,0,0,1-20.28,54c-4.63,9.67-10.29,19.35-19.21,25.3A31,31,0,0,1,82.59,160Z"
        />
      </svg>
    </button>
  );
};

export default YesButton;
