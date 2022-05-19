import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { setFilters, filters, data,
    setFilteredPlanet, setColumnsOptions, columnsOptions } = useContext(MyContext);

  const activeFilters = () => {
    const { filterByNumericValues, currentFilter } = filters;
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues,
        currentFilter[0],
      ],
    });
  };

  useEffect(() => {
    function filteredColumns() {
      const columnsFiltered = columnsOptions.filter((option) => {
        const filtered = filters.filterByNumericValues.every((filter) => (
          filter.column !== option
        ));
        return filtered;
      });
      if (columnsOptions.length !== columnsFiltered.length) {
        setColumnsOptions(columnsFiltered);
      }
    }
    filteredColumns();
  }, [filters, setColumnsOptions, columnsOptions]);

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

  const removeAllFilters = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [],
    });
    setFilteredPlanet(data);
  };

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

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover Filtros
      </button>

    </div>
  );
}

export default SearchBar;
