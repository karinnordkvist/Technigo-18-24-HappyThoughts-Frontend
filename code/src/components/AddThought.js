import React from 'react';
import SubmitButton from 'components/SubmitButton';

const AddThought = ({
  newThought,
  handleNewThought,
  thoughtLength,
  submitNewThought,
}) => {
  // Add class of 'red-text' to counter if amount of letters exceeds 140
  const getWordcountClassNames = () => {
    return thoughtLength >= 140 ? 'red-text' : '';
  };

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
          <p className={`${getWordcountClassNames()} add-thought__word-count`}>
            {thoughtLength} / 140
          </p>
        }

        <SubmitButton submitFunction={submitNewThought} />
      </form>
    </div>
  );
};

export default AddThought;
