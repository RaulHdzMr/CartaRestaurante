import React, { useState } from 'react';

const EditCategoryForm = ({ category, onUpdateCategory, onCancel }) => {
  const [categoryName, setCategoryName] = useState(category.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName) return;
    onUpdateCategory({ ...category, category: categoryName });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Category</h3>
      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditCategoryForm;
