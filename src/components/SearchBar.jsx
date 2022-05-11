import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { setInput, setFilteredPlanet, data } = useContext(MyContext);

  const handleChange = ({ target: { value } }) => {
    setInput({ filterByName: { name: value } });

    const result = data.filter((planet) => planet.name.toUpperCase()
      .includes(value.toUpperCase()));
    setFilteredPlanet(result);
  };

  useEffect(() => {
    setFilteredPlanet(data);
  }, [setFilteredPlanet, data]);

  const column = ['population', 'orbital_period', 'diameter,',
    'rotation_period', 'surface_water'];
  const valueRange = ['maior que', 'menor que', 'igual a'];

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

      <label htmlFor="column-filter">
        Coluna
        <select
          data-testid="column-filter"
          name="column-filter"
          id="column-filter"
        >
          { column.map((filters) => (
            <option key={ filters }>
              { filters }
            </option>
          )) }
        </select>
      </label>

      <label htmlFor="comparison">
        Operador
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
        >
          { valueRange.map((range) => (
            <option key={ range }>
              { range }
            </option>
          )) }
        </select>
      </label>

      <input
        data-testid="value-filter"
        type="number"
      />
    </div>
  );
}

export default SearchBar;
