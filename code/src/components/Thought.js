import React, { useState, useEffect } from 'react';

const Thought = ({ message, hearts, time, id, submitLikeUpdateList }) => {
  // State to control which css-class (background-color) to add to each heart-wrapper
  const [heartBackground, setHeartBackground] = useState('gray-bg');

  // Send POST-request to add heart to thought + increasing amount of heart-clicks
  const handleLike = () => {
    fetch(`https://happy-thoughts-by-karin.herokuapp.com/thoughts/${id}/like`, {
      method: 'POST',
    }).then(() => {
      let heartClicks = 0;
      heartClicks += 1;
      submitLikeUpdateList(id, heartClicks);
    });
  };

  // Set background-color of heart-button depending on amount of likes
  useEffect(() => {
    hearts > 0 && setHeartBackground('red-bg');
  }, [hearts]);

  return (
    <div className="thought__wrapper">
      <p className="thought__message">{message}</p>
      <div className="thought__stats__wrapper">
        <p className="thought__stats__heart-count">
          <button
            className={`thought__heart-button ${heartBackground}`}
            onClick={handleLike}
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

export default Thought;
