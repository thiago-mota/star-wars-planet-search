import React from 'react';
import './App.css';
import Table from './components/Table';
import MyProvider from './context/MyProvider';
import SearchBar from './components/SearchBar';
import ShowFilters from './components/ShowFilters';

function App() {
  return (
    <MyProvider>
      <SearchBar />
      <ShowFilters />
      <Table />
    </MyProvider>
  );
}

export default App;
