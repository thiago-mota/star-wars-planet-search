import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { setFilters, filters, data,
    setFilteredPlanet, filteredPlanet,
    setColumnsOptions, columnsOptions } = useContext(MyContext);

  const activeFilters = () => {
    const { filterByNumericValues, currentFilter } = filters;
    const { value, comparison, column } = currentFilter[0];

    if (comparison === 'maior que') {
      setFilteredPlanet(filteredPlanet.filter((planet) => (
        Number(value) < Number(planet[column]))));
    }
    if (comparison === 'menor que') {
      setFilteredPlanet(filteredPlanet.filter((planet) => (
        Number(value) > Number(planet[column]))));
    }
    if (comparison === 'igual a') {
      setFilteredPlanet(filteredPlanet.filter((planet) => (
        Number(value) === Number(planet[column]))));
    }
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues,
        currentFilter[0],
      ],
    });

    const columnsFiltered = columnsOptions.filter((option) => {
      const filtered = filters.filterByNumericValues.every((filter) => (
        filter.column !== option
      ));
      return filtered;
    });
    setColumnsOptions(columnsFiltered);
    // console.log(columnsFiltered);
    // console.log('option', columnsOptions);
    // console.log(filterByNumericValues);
    // console.log(currentFilter);
  };
  // console.log(filters);

  const handleFilterChange = ({ target: { value, name } }) => {
    if (name === 'name') {
      setFilters({ ...filters, filterByName: { name: value } });
      const result = data.filter((planet) => planet.name.toUpperCase()
        .includes(value.toUpperCase()));
      setFilteredPlanet(result);
    } else {
      setFilters({
        ...filters,
        currentFilter: [{
          ...filters.currentFilter[0],
          [name]: value,
        }],
      });
    }
  };

  useEffect(() => {
    setFilteredPlanet(data);
  }, [setFilteredPlanet, data]);

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
