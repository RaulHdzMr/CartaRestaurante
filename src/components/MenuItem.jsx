import React, { useState } from 'react';
import EditProductForm from './admin/EditProductForm';

const MenuItem = ({ name, price, onUpdateProduct, onDeleteProduct }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProduct = (updatedProduct) => {
    onUpdateProduct(updatedProduct);
    setIsEditing(false);
  };

  return (
    <div className="menu-item">
      {isEditing ? (
        <EditProductForm
          product={{ name, price }}
          onUpdateProduct={handleUpdateProduct}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="item-details">
          <p className="item-name">{name}</p>
          <p className="item-price">{Number(price).toFixed(2)}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={onDeleteProduct}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
