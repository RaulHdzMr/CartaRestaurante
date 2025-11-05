import React from 'react';
import './App.css';
import Category from './components/Category';
import menuData from './menu.json';

function App() {
  return (
    <div className="App">
      <div className="menu">
        <div className="heading">
          <h1>CAMPER CAFE</h1>
          <p>Est. 2020</p>
        </div>
        <hr className="top-line" />
        {menuData.map((category, index) => (
          <Category
            key={index}
            category={category.category}
            image={category.image}
            items={category.items}
          />
        ))}
        <hr className="bottom-line" />
        <div className="footer">
          <a href="#">Visit our website</a>
          <p>123 Free Code Camp Drive</p>
        </div>
      </div>
    </div>
  );
}

export default App;
