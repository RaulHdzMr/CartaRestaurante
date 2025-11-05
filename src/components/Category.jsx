import React from 'react';
import MenuItem from './MenuItem';

const Category = ({ category, image, items }) => {
  return (
    <div className={`${category.toLowerCase()}-section`}>
        <div className="category-header">
            <h2>{category}</h2>
            <img src={image} className="icon" alt={`${category} icon`} />
        </div>
      {items.map((item, index) => (
        <MenuItem key={index} name={item.name} price={item.price} />
      ))}
    </div>
  );
};

export default Category;
