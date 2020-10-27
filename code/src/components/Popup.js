import React from 'react';

export const Popup = ({ setError }) => {
  return (
    <span className="error__popup__wrapper">
      <p className="error__popup">
        Oops, something went wrong. Please try again.
        <button className="error__btn" onClick={() => setError('hidden')}>
          OK!
        </button>
      </p>
    </span>
  );
};
