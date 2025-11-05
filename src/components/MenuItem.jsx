import React, { useState } from 'react';
import EditProductForm from './admin/EditProductForm';

const MenuItem = ({ name, price, editMode, onUpdateProduct, onDeleteProduct }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProduct = (updatedProduct) => {
    onUpdateProduct(updatedProduct);
    setIsEditing(false);
  };

  return (
    <div className="menu-item">
      {isEditing && editMode ? (
        <EditProductForm
          product={{ name, price }}
          onUpdateProduct={handleUpdateProduct}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="item-details">
          <p className="flavor">{name}</p>
          <p className="price">{price}</p>
        </div>
      )}
      {editMode && !isEditing && (
        <div className="item-actions">
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={onDeleteProduct} className="delete-button">Delete</button>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
