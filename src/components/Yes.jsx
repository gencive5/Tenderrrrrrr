import React from 'react';
import yesIcon from '../assets/images/coeur.png';

const YesButton = ({ handleNext }) => {
  return (
    <button className="yes-button" onClick={handleNext}>
       <img src={yesIcon} alt="Yes Icon" className="yes-icon" />
    </button>



  );
};

export default YesButton;
