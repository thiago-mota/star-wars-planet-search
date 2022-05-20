import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { setFilters, filters, data,
    setFilteredPlanet, setColumnsOptions,
    columnsOptions, setData } = useContext(MyContext);

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

  const handleSortFilters = ({ target: { value, name } }) => {
    if (name === 'column-sort') {
      setFilters({
        ...filters,
        order: {
          ...filters.order,
          column: value,
        },
      });
      console.log(filters.order);
    }
    if (name === 'radio') {
      setFilters({
        ...filters,
        order: {
          ...filters.order,
          sort: value,
        },
      });
      console.log(filters.order);
    }
  };

  useEffect(() => {
    const { order } = filters;
    const { column, sort } = order;

    let planetList = data;

    if (sort === 'ASC') {
      planetList = planetList.sort((a, b) => a[column] - b[column]);
    }

    if (sort === 'DESC') {
      planetList = planetList.sort((a, b) => b[column] - a[column]);
    }
    setData(planetList);
  }, [filters, data, setData]);

  // const expectedPlanetsWithNumericValues = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV'];
  //   expect(actualPlanetsWithNumericValues).toEqual(expectedPlanetsWithNumericValues);

  //   const expectedPlanetsWithUnknownValues = ['Dagobah', 'Hoth'];
  //   expect(actualPlanetsWithUnknownValues).toEqual(expect.arrayContaining(expectedPlanetsWithUnknownValues));

  const valueRange = ['maior que', 'menor que', 'igual a'];
  const orderOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

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

      <select
        data-testid="column-sort"
        name="column-sort"
        onChange={ handleSortFilters }
      >
        { orderOptions.map((options) => (
          <option
            key={ options }
          >
            { options }
          </option>
        )) }
      </select>

      <label htmlFor="ascendente">
        Ascendente
        <input
          value="ASC"
          defaultChecked="checked"
          name="radio"
          type="radio"
          id="ascendente"
          data-testid="column-sort-input-asc"
          onClick={ handleSortFilters }

        />
      </label>

      <label htmlFor="descendente">
        Descendente
        <input
          value="DESC"
          name="radio"
          type="radio"
          id="descendente"
          data-testid="column-sort-input-desc"
          onClick={ handleSortFilters }
        />
      </label>

      <button
        type="button"
        name="ordenar"
        data-testid="column-sort-button-filter"
        onClick={ handleSortFilters }
      >
        Ordenar
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
