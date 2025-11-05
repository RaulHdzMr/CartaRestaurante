import React, { useState } from 'react';
import MenuItem from './MenuItem';
import AddProductForm from './admin/AddProductForm';
import EditCategoryForm from './admin/EditCategoryForm';

const Category = ({
  category,
  image,
  items,
  editMode,
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
      {isEditing && editMode ? (
        <EditCategoryForm
          category={{ category, image, items }}
          onUpdateCategory={handleUpdateCategory}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="category-header">
          <h2>{category}</h2>
          {editMode && (
            <>
              <button onClick={() => setIsEditing(true)}>Edit Category</button>
              <button onClick={onDeleteCategory} className="delete-button">Delete Category</button>
            </>
          )}
        </div>
      )}

      {items.map((item) => (
        <MenuItem
          key={item.id}
          name={item.nombre}
          price={item.precio}
          editMode={editMode}
          onUpdateProduct={(updatedProduct) => onUpdateProduct(item.id, updatedProduct)}
          onDeleteProduct={() => onDeleteProduct(item.id)}
        />
      ))}
      {editMode && <AddProductForm onAddProduct={onAddProduct} />}
    </div>
  );
};

export default Category;
