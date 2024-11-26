import React from 'react';
import noIcon from '../assets/images/crossb.png';


const NoButton = ({ handleNext }) => {
  console.log("Button clicked!"); 
  return (
    <button className="no-button" onClick={handleNext}>
      <img src={noIcon} alt="No Icon" className="no-icon" />
    </button>
  );
};

export default NoButton;
