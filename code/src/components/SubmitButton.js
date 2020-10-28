import React from 'react';

const SubmitButton = ({ submitFunction }) => {
  return (
    <button
      type="submit"
      value="Submit"
      onClick={submitFunction}
      className="add-thought__button"
    >
      <span className="heart" role="img" aria-label="heart symbol">
        ❤️
      </span>{' '}
      Send Happy Thought{' '}
      <span className="heart" role="img" aria-label="heart symbol">
        ❤️
      </span>
    </button>
  );
};

export default SubmitButton;
