import React from 'react';
import MenuItem from './MenuItem';

interface MenuItemProps {
  name: string;
  price: string;
}

interface CategoryProps {
  category: string;
  image: string;
  items: MenuItemProps[];
}

const Category: React.FC<CategoryProps> = ({ category, image, items }) => {
  return (
    <div className={`${category.toLowerCase()}-section`}>
        <div className="category-header">
            <h2>{category}</h2>
        </div>
        <img src={image} className="icon" alt={`${category} icon`} />
      {items.map((item, index) => (
        <MenuItem key={index} name={item.name} price={item.price} />
      ))}
    </div>
  );
};

export default Category;
