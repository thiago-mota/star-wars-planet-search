import React from 'react';
import './App.css';
import Table from './components/Table';
import MyProvider from './context/MyProvider';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <MyProvider>
      <SearchBar />
      <Table />
    </MyProvider>
  );
}

export default App;
