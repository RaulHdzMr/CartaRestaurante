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
          <img src={image} className="icon" alt={`${category} icon`} />
          <button onClick={() => setIsEditing(true)}>Edit Category</button>
          <button onClick={() => onDeleteCategory(category)} className="delete-button">Delete Category</button>
        </div>
      )}

      {items.map((item, index) => (
        <MenuItem
          key={index}
          name={item.name}
          price={item.price}
          onUpdateProduct={(updatedProduct) => onUpdateProduct(item.name, updatedProduct)}
          onDeleteProduct={() => onDeleteProduct(category, item.name)}
        />
      ))}
      <AddProductForm onAddProduct={(newProduct) => onAddProduct(category, newProduct)} />
    </div>
  );
};

export default Category;
