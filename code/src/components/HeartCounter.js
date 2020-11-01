import React from 'react';

const HeartCounter = ({ heartCount, setHeartCounter }) => {
  const removeHeartCounter = () => {
    setHeartCounter('hidden');
  };

  // After 5000ms - set the heart-counter to hidden
  setTimeout(removeHeartCounter, 5000);

  return (
    <span className="heart-counter__popup__wrapper">
      <p className="heart-counter__popup-text">Like-count:</p>
      <p className="heart-counter__popup-counter">{heartCount}</p>
    </span>
  );
};

export default HeartCounter;
