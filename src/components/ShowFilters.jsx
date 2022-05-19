import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function ShowFilters() {
  const { setFilters, filters, data,
    setFilteredPlanet, filteredPlanet,
    setColumnsOptions, columnsOptions } = useContext(MyContext);

  const handleClick = ({ column }) => {
    const { filterByNumericValues } = filters;

    const removeSingleFilter = filterByNumericValues.filter((filter) => (
      filter.column !== column
    ));

    setFilters({
      ...filters,
      filterByNumericValues: removeSingleFilter,
    });

    // console.log(column);
    // let addPlanet = [];

    // if (comparison === 'maior que') {
    //   addPlanet = data.filter((planet) => (
    //     Number(value) > Number(planet[column])));
    // }
    // if (comparison === 'menor que') {
    //   addPlanet = data.filter((planet) => (
    //     Number(value) < Number(planet[column])));
    // }
    // if (comparison === 'igual a') {
    //   addPlanet = data.filter((planet) => (
    //     Number(value) !== Number(planet[column])));
    // }

    // setFilteredPlanet([...filteredPlanet, ...addPlanet]);
    setColumnsOptions([...columnsOptions, column]);

    // console.log(filteredPlanet);
    // console.log('filteredPlanet', ...filteredPlanet);
    // console.log('addPlanet', ...addPlanet);
  };

  return (
    <section>
      { filters.filterByNumericValues.map((filter, index) => (
        <p
          data-testid="filter"
          key={ index }
        >
          <span>{ `${filter.column} ` }</span>
          <span>{ `${filter.comparison} ` }</span>
          <span>{ `${filter.value} `}</span>
          <button
            type="button"
            onClick={ () => handleClick(filter) }
          >
            x
          </button>
        </p>
      )) }
    </section>
  );
}

export default ShowFilters;
