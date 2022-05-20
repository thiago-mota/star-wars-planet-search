const starWarsAPI = async () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(endpoint);
  const data = await response.json();

  const menosUm = -1;
  const orderedData = data.results.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return menosUm;
    }
    return orderedData;
  });
  return data.results;
};

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

export default starWarsAPI;
