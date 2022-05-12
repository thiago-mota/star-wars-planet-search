import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { setFilters, filters, data,
    setFilteredPlanet } = useContext(MyContext);

  const activeFilters = () => {
    const { filterByNumericValues } = filters;
    const { value, comparison, column } = filterByNumericValues[0];

    if (comparison === 'maior que') {
      setFilteredPlanet(data.filter((planet) => (
        Number(value) < Number(planet[column]))));
    }
    if (comparison === 'menor que') {
      setFilteredPlanet(data.filter((planet) => (
        Number(value) > Number(planet[column]))));
    }
    if (comparison === 'igual a') {
      setFilteredPlanet(data.filter((planet) => (
        Number(value) === Number(planet[column]))));
    }
  };

  // const multipleFilters = () => {
  //   const { filterByNumericValues } = filters;
  //   const { value, comparison, column } = filterByNumericValues[0];

  //   let result = data;
  // };

  const handleFilterChange = ({ target: { value, name } }) => {
    if (name === 'name') {
      setFilters({ ...filters, filterByName: { name: value } });
      const result = data.filter((planet) => planet.name.toUpperCase()
        .includes(value.toUpperCase()));
      setFilteredPlanet(result);
    } else {
      setFilters({
        ...filters,
        filterByNumericValues: [{
          ...filters.filterByNumericValues[0],
          [name]: value,
        }],
      });
    }
  };

  useEffect(() => {
    setFilteredPlanet(data);
  }, [setFilteredPlanet, data]);

  const columnsOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const valueRange = ['maior que', 'menor que', 'igual a'];

  return (
    <div>
      <h1> Projeto Star Wars - Trybe </h1>
      <input
        type="text"
        name="name"
        id="search-input"
        data-testid="name-filter"
        onChange={ handleFilterChange }
      />

      <label htmlFor="column-filter">
        Coluna
        <select
          data-testid="column-filter"
          name="column"
          id="column-filter"
          onChange={ handleFilterChange }
        >
          { columnsOptions.map((options) => (
            <option key={ options }>
              { options }
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
          onChange={ handleFilterChange }
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
        defaultValue={ 0 }
        name="value"
        type="number"
        onChange={ handleFilterChange }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ activeFilters }
      >
        Filtrar
      </button>
    </div>
  );
}

export default SearchBar;
