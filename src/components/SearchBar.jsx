import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { setInput, setFilteredPlanet, data,
    filterByNumericValues, setFilterByNumericValues } = useContext(MyContext);

  const handleInputChange = ({ target: { value } }) => {
    setInput({ filterByName: { name: value } });

    const result = data.filter((planet) => planet.name.toUpperCase()
      .includes(value.toUpperCase()));
    setFilteredPlanet(result);
  };

  const handleNumberChange = ({ target: { value } }) => {
    setFilterByNumericValues({
      filterByNumericValues: [{ ...filterByNumericValues
        .filterByNumericValues[0],
      value }],
    });
  };

  useEffect(() => {
    setFilteredPlanet(data);
  }, [setFilteredPlanet, data]);

  const columns = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const valueRange = ['maior que', 'menor que', 'igual a'];

  return (
    <div>
      <h1> Projeto Star Wars - Trybe </h1>
      <input
        type="text"
        name="search-input"
        id="search-input"
        data-testid="name-filter"
        onChange={ handleInputChange }
      />

      <label htmlFor="column-filter">
        Coluna
        <select
          data-testid="column-filter"
          name="column-filter"
          id="column-filter"
        >
          { columns.map((filters) => (
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
        value={ filterByNumericValues.value }
        onChange={ handleNumberChange }
      />

      <button
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </div>
  );
}

export default SearchBar;
