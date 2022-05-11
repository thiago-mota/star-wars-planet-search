import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { setInput, setFilteredPlanet, data } = useContext(MyContext);

  const handleChange = ({ target: { value } }) => {
    setInput({ filterByName: { name: value } });

    const result = data.filter((planet) => planet.name.toUpperCase()
      .includes(value.toUpperCase()));
    setFilteredPlanet(result);
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
