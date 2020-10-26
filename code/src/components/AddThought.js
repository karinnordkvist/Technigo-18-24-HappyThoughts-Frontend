import React, { useState } from 'react';
import { SubmitButton } from 'components/SubmitButton';

export const AddThought = () => {
  const apiURL = 'https://happy-thoughts-technigo.herokuapp.com/thoughts';
  const [newThought, setNewThought] = useState('');
  const [thoughtLength, setThoughtLength] = useState('0');

  const handleNewThought = (event) => {
    setNewThought(event.target.value);
    setThoughtLength(event.target.value.length);
  };

  const getClassNames = () => {
    return thoughtLength === 140
      ? 'add-thought__word-count red-text'
      : 'add-thought__word-count';
  };

  // Submit-function with POST-method
  const submitNewThought = (event) => {
    event.preventDefault();

    fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: newThought }),
    });
    setNewThought('');
  };

  return (
    <div className="thought__wrapper gray-bg">
      <form>
        <label htmlFor="thought-input" className="thought__question">
          What's making you happy right now?
        </label>
        <textarea
          id="thought-input"
          name="thought-input"
          value={newThought}
          className="add-thought__input-field"
          placeholder="Type your thoughts here..."
          onChange={handleNewThought}
          maxlength="140"
        />

        {/* Wordcount */}
        {<p className={getClassNames()}>{thoughtLength} / 140</p>}

        <SubmitButton submitFunction={submitNewThought} />
      </form>
    </div>
  );
};
