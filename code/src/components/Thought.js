import React, { useState, useEffect } from 'react';

export const Thought = ({ message, hearts, time, id, submitLikeUpdate }) => {
  // Background of heart-buttons (class-state)
  const [heartBackground, setHeartBackground] = useState('gray-bg');
  const submitLike = () => {
    fetch(`https://happy-thoughts-technigo.herokuapp.com/thoughts/${id}/like`, {
      method: 'POST',
    }).then(() => {
      // window.location.reload();
      submitLikeUpdate(id);
    });
  };
  // Set background of heart-button to red if it has any likes
  useEffect(() => {
    hearts > 0 ? setHeartBackground('red-bg') : setHeartBackground('gray-bg');
  });

  return (
    <div className="thought__wrapper">
      <p className="thought__message">{message}</p>
      <div className="thought__stats__wrapper">
        <p className="thought__stats__heart-count">
          <button
            className={`thought__heart-button ${heartBackground}`}
            onClick={submitLike}
            value={id}
          >
            <span
              className="thought__stats__heart"
              role="img"
              aria-label="heart symbol"
            >
              ❤️
            </span>
          </button>{' '}
          x {hearts}
        </p>
        <p className="thought__stats__timestamp">{time}</p>
      </div>
    </div>
  );
};
