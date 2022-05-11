import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { setFilterPlanets } = useContext(MyContext);

  const handleChange = ({ target: { value } }) => {
    setFilterPlanets({ filterByName: { name: value } });
  };

  return (
    <div>
      <h1> Projeto Star Wars - Trybe </h1>
      <input
        type="text"
        name="search-input"
        id="search-input"
        data-testid="name-filter"
        onChange={ handleChange }
      />
    </div>
  );
}

export default SearchBar;
