import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { filters, filteredPlanet, data, setFilteredPlanet } = useContext(MyContext);
  const { filterByNumericValues } = filters;

  useEffect(() => {
    let testFilteredPlanets = data;
    filterByNumericValues.forEach((filter) => {
      testFilteredPlanets = testFilteredPlanets.filter((planet) => {
        if (filter.comparison === 'maior que') {
          return Number(filter.value) < Number(planet[filter.column]);
        } if (filter.comparison === 'menor que') {
          return Number(filter.value) > Number(planet[filter.column]);
        }
        if (filter.comparison === 'igual a') {
          return Number(filter.value) === Number(planet[filter.column]);
        }

        return testFilteredPlanets;
      });
    });
    setFilteredPlanet(testFilteredPlanets);
  }, [filterByNumericValues, data, setFilteredPlanet]);

  /* Grande agradecimento ao Matheus Alves que me deu uma luz em relação a um erro no req 6.
     resultado de nossa conversa foram as alterações dos filtros para um useEffect.
  */

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>

      <tbody>
        { filteredPlanet.length === 0
          ? (
            <tr>
              <td>
                Loading...
              </td>
            </tr>
          )
          : (filteredPlanet.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))) }
      </tbody>
    </table>
  );
}

export default Table;
