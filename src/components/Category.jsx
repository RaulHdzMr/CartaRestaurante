import React, { useState } from 'react';
import MenuItem from './MenuItem';
import AddProductForm from './admin/AddProductForm';
import EditCategoryForm from './admin/EditCategoryForm';

const Category = ({
  category,
  image,
  items,
  onUpdateCategory,
  onDeleteCategory,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateCategory = (updatedCategory) => {
    onUpdateCategory(updatedCategory);
    setIsEditing(false);
  };

  return (
    <div className={`${category.toLowerCase()}-section`}>
      {isEditing ? (
        <EditCategoryForm
          category={{ category, image, items }}
          onUpdateCategory={handleUpdateCategory}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="category-header">
          <h2>{category}</h2>
          <button onClick={() => setIsEditing(true)}>Edit Category</button>
          <button onClick={onDeleteCategory} className="delete-button">Delete Category</button>
        </div>
      )}

      {items.map((item) => (
        <MenuItem
          key={item.id}
          name={item.nombre}
          price={item.precio}
          onUpdateProduct={(updatedProduct) => onUpdateProduct(item.id, updatedProduct)}
          onDeleteProduct={() => onDeleteProduct(item.id)}
        />
      ))}
      <AddProductForm onAddProduct={onAddProduct} />
    </div>
  );
};

export default Category;
