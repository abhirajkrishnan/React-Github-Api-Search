import React from 'react';
import Nav from './Nav'
import './index.css';
import Search from './Search'
import Info from './Info'


function App() {
  return (
    <main className=" h-screen w-screen bg-gray-100">
      <Nav/>
      <Search/>
      <Info/>
    </main>
  );
}

export default App;
