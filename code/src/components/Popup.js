import React from 'react';

const Popup = ({ setError, setNewThought }) => {
  const handleClick = () => {
    setError('hidden');
    setNewThought('');
  };

  return (
    <span className="error__popup__wrapper">
      <p className="error__popup">
        Oops, something went wrong. Please try again.
        {/* Set error-state to 'hidden' when clicking on OK, to remove popup */}
        <button className="error__btn" onClick={() => handleClick()}>
          OK!
        </button>
      </p>
    </span>
  );
};

export default Popup;
