import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import starWarsAPI from '../services/Star Wars';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState({
    filterByName: { name: '' },
  });

  const getPlanets = async () => {
    const result = await starWarsAPI();
    setData(result);
  };

  const getFilteredPlanets = () => {
    const filteredPlanets = data.length === 0
      ? 'Loading...'
      : (data.filter((planet) => (
        planet.name.includes(filterPlanets.filterByName.name)
      )));
  };
  getFilteredPlanets();

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    data,
    setFilterPlanets,
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
