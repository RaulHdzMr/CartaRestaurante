import React from 'react';

const MenuItem = ({ name, price }) => {
  return (
    <div className="menu-item">
      <p>{name}</p>
      <p className="price">{price}</p>
    </div>
  );
};

export default MenuItem;
