import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import starWarsAPI from '../services/Star Wars';

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    filterByName: { name: '' },
  });
  const [filteredPlanet, setFilteredPlanet] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    filterByNumericValues: [{
      column: '',
      comparison: '',
      value: 0,
    }],
  });

  const getPlanets = async () => {
    const result = await starWarsAPI();
    setData(result);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    data,
    input,
    setInput,
    filteredPlanet,
    setFilteredPlanet,
    filterByNumericValues,
    setFilterByNumericValues,
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
