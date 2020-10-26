import React, { useState, useEffect } from 'react';

import { Thought } from 'components/Thought';
import moment from 'moment';

export const ListOfThoughts = () => {
  const apiURL = 'https://happy-thoughts-technigo.herokuapp.com/thoughts/';
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    fetch(apiURL)
      .then((results) => results.json())
      .then((json) => {
        setThoughts(json);
      });
  }, [thoughts]);

  return (
    <div>
      {thoughts.map((thought) => {
        return (
          <Thought
            message={thought.message}
            hearts={thought.hearts}
            time={moment(thought.createdAt).startOf('seconds').fromNow()}
            key={thought._id}
            id={thought._id}
          />
        );
      })}
    </div>
  );
};
