import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import starWarsAPI from '../services/Star Wars';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [orderedData, setOrderedData] = useState([]);

  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    currentFilter: [{
      column: 'population',
      comparison: 'maior que',
      value: 0,
    }],
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

  const [filteredPlanet, setFilteredPlanet] = useState([]);
  const [columnsOptions, setColumnsOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const getPlanets = async () => {
    const result = await starWarsAPI();
    setData(result);
    setOrderedData(result);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    data,
    setData,
    filters,
    setFilters,
    filteredPlanet,
    setFilteredPlanet,
    columnsOptions,
    setColumnsOptions,
    orderedData,
    setOrderedData,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
