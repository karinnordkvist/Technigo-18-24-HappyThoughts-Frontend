import React, { useState, useEffect } from 'react';

export const Thought = ({ message, hearts, time, id }) => {
  const [likedThought, setLikedThought] = useState('');
  const likeURL = `https://happy-thoughts-technigo.herokuapp.com/thoughts/${id}/like`;

  // Set background of heart-button to red if it has any likes
  useEffect(() => {
    hearts > 0
      ? setLikedThought('thought__heart-button red-bg')
      : setLikedThought('thought__heart-button gray-bg');
  });

  // POST like-function
  const likeThought = (event) => {
    event.preventDefault();
    fetch(likeURL, {
      method: 'POST',
    });
  };

  return (
    <div className="thought__wrapper">
      <p>{message}</p>
      <div className="thought__stats__wrapper">
        <p className="thought__stats__heart-count">
          <button className={likedThought} onClick={likeThought}>
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
