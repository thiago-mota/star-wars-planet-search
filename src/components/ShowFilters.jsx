import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function ShowFilters() {
  const { setFilters, filters, setColumnsOptions,
    columnsOptions } = useContext(MyContext);

  const handleClick = ({ column }) => {
    const { filterByNumericValues } = filters;

    const removeSingleFilter = filterByNumericValues.filter((filter) => (
      filter.column !== column
    ));

    setFilters({
      ...filters,
      filterByNumericValues: removeSingleFilter,
    });
    setColumnsOptions([...columnsOptions, column]);
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
