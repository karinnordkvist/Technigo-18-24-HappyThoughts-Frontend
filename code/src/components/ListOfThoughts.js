import React, { useState, useEffect } from 'react';

import { AddThought } from 'components/AddThought';
import { Thought } from 'components/Thought';
import { Popup } from 'components/Popup';
import moment from 'moment';

export const ListOfThoughts = () => {
  // Array of imported thoughts
  const [thoughts, setThoughts] = useState([]);
  // New thought to add to existing array of thoughts
  const [newThought, setNewThought] = useState('');
  // Amount of letters in new thought
  const [thoughtLength, setThoughtLength] = useState('0');
  // To set error-status and call for popup
  const [error, setError] = useState('hidden');
  const apiURL = 'https://happy-thoughts-technigo.herokuapp.com/thoughts/';

  // ON LOAD: Fetch thoughts for list
  const getData = () => {
    fetch(apiURL)
      .then((results) => results.json())
      .then((json) => {
        setThoughts(json);
      });
  };

  useEffect(() => {
    getData();
    setInterval(getData, 5000); // runs every 5 seconds.
  }, []);

  // New thought
  const handleNewThought = (event) => {
    setNewThought(event.target.value);
    setThoughtLength(event.target.value.length);
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
    })
      .then((results) => results.json())
      .then((newThought) => {
        if (newThought.message === 'Could not save thought') {
          setError('showing');
        } else {
          setThoughts((Thoughts) => [newThought, ...Thoughts]);
        }
      });
    setNewThought('');
  };

  const submitLikeUpdate = (id) => {
    const updatedThoughts = thoughts.map((thought) => {
      if (id === thought._id) {
        thought.hearts += 1;
      }
      return thought;
    });

    setThoughts(updatedThoughts);
  };

  return (
    <div>
      <AddThought
        newThought={newThought}
        handleNewThought={handleNewThought}
        thoughtLength={thoughtLength}
        submitNewThought={submitNewThought}
      />

      {/* Show error-popup if error in submit */}
      {error === 'showing' && (
        <Popup message="Oops, something went wrong!" setError={setError} />
      )}

      {thoughts.map((thought) => {
        return (
          <Thought
            message={thought.message}
            hearts={thought.hearts}
            time={moment(thought.createdAt).startOf('seconds').fromNow()}
            key={thought._id}
            id={thought._id}
            setThoughts={setThoughts}
            thoughts={thoughts}
            submitLikeUpdate={submitLikeUpdate}
          />
        );
      })}
    </div>
  );
};
