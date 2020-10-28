import React from 'react';

const HeartCounter = ({ heartCount }) => {
  return (
    <span className="heart-counter__popup__wrapper">
      <p className="heart-counter__popup-text">Like-count:</p>
      <p className="heart-counter__popup-counter">{heartCount}</p>
    </span>
  );
};

export default HeartCounter;
