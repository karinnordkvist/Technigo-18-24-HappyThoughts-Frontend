import React, { useState, useEffect } from 'react';
import SubmitButton from 'components/SubmitButton';

const AddThought = ({
  newThought,
  handleNewThought,
  thoughtLength,
  submitNewThought,
}) => {
  const [textColor, setTextColor] = useState('');

  // Add class of 'red-text' to counter if amount of letters is less than 5 or exceeds 140
  useEffect(() => {
    thoughtLength < 5
      ? setTextColor('red-text')
      : thoughtLength >= 140
      ? setTextColor('red-text')
      : setTextColor('');
  });

  return (
    <div className="thought__wrapper gray-bg">
      <form>
        <label htmlFor="thought-input" className="thought__question">
          What's making you happy right now?
        </label>
        <textarea
          id="thought-input"
          value={newThought}
          className="add-thought__input-field"
          placeholder="Type your thoughts here..."
          onChange={handleNewThought}
          maxLength="140"
        />

        {
          // Wordcounter
          <p className={`add-thought__word-count ${textColor}`}>
            {thoughtLength} / 140
          </p>
        }

        <SubmitButton submitFunction={submitNewThought} />
      </form>
    </div>
  );
};

export default AddThought;
