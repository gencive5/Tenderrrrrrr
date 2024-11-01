import React from 'react';
import noIcon from '../assets/images/no.svg';


const NoButton = ({ handleNext }) => {
  return (
    <button className="no-button" onClick={handleNext}>
      <img src={noIcon} alt="No Icon" className="no-icon" />
    </button>
  );
};

export default NoButton;
