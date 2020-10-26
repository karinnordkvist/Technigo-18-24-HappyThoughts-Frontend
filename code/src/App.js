import React from 'react';
import { AddThought } from './components/AddThought';
import { ListOfThoughts } from './components/ListOfThoughts';

export const App = () => {
  return (
    <div>
      <AddThought />
      <ListOfThoughts />
    </div>
  );
};
