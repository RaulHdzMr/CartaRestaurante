import React from 'react';

interface MenuItemProps {
  name: string;
  price: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, price }) => {
  return (
    <div className="menu-item">
      <p>{name}</p>
      <p className="price">{price}</p>
    </div>
  );
};

export default MenuItem;
