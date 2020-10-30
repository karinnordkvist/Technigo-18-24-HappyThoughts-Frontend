import React, { useState, useEffect } from 'react';

import AddThought from 'components/AddThought';
import Thought from 'components/Thought';
import Popup from 'components/Popup';
import HeartCounter from 'components/HeartCounter';
import moment from 'moment';

import { ThoughtsUrl } from 'Urls';

const ListOfThoughts = () => {
  // Array of imported thoughts
  const [thoughts, setThoughts] = useState([]);
  // New thought to add to existing array of thoughts
  const [newThought, setNewThought] = useState('');
  // To count amount of letters in a new thought
  const [thoughtLength, setThoughtLength] = useState('0');
  // To set error-popup to hidden or shown
  const [error, setError] = useState('hidden');
  // To be able to count how many likes you've given
  const [heartCount, setHeartCount] = useState(0);

  // Function for initial data-fetch
  const getData = () => {
    fetch(ThoughtsUrl)
      .then((results) => results.json())
      .then((json) => setThoughts(json));
  };

  // ON LOAD: Fetch thoughts for list and get new data every 5 seconds
  useEffect(() => {
    getData();
    setInterval(getData, 5000); // Fetch data every 5 seconds
  }, []);

  // Update the newThought-state + length-state before submit
  const handleNewThought = (event) => {
    setNewThought(event.target.value);
    setThoughtLength(event.target.value.length);
  };

  // Submit-function with POST-method + error-handling + reset input
  const submitNewThought = (event) => {
    event.preventDefault();
    fetch(ThoughtsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: newThought }),
    }).then((results) => {
      if (results.ok === false) {
        setError('showing'); // Display error popup
      } else {
        getData(); // Fetch data to refresh the list
        setNewThought(''); // Reset input field
      }
    });
  };

  // Update the list of thoughts to display when liking a thought
  const submitLikeUpdateList = (id, heartClicks) => {
    const updatedThoughts = thoughts.map((thought) => {
      if (id === thought._id) {
        thought.hearts += 1;
      }
      return thought;
    });
    setHeartCount(heartCount + heartClicks);
    setThoughts(updatedThoughts);
  };

  return (
    <div>
      {/* Form to add a thought */}
      <AddThought
        newThought={newThought}
        handleNewThought={handleNewThought}
        thoughtLength={thoughtLength}
        submitNewThought={submitNewThought}
      />

      {/* If liking a thought, show heart-counter */}
      {heartCount > 0 && <HeartCounter heartCount={heartCount} />}

      {/* Show error-popup if error in submit */}
      {error === 'showing' && (
        <Popup message="Oops, something went wrong!" setError={setError} />
      )}

      {/* Loop over API with thoughts to reveal each one */}
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
            submitLikeUpdateList={submitLikeUpdateList}
          />
        );
      })}
    </div>
  );
};

export default ListOfThoughts;
