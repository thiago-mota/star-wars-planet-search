import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function ShowFilters() {
  const { filters: { filterByNumericValues } } = useContext(MyContext);

  return (
    <section>
      { filterByNumericValues.map((filter, index) => (
        <p key={ index }>
          <span>{ `${filter.column} ` }</span>
          <span>{ `${filter.comparison} ` }</span>
          <span>{ `${filter.value} `}</span>
          <button type="button">x</button>
        </p>
      )) }
    </section>
  );
}

export default ShowFilters;
