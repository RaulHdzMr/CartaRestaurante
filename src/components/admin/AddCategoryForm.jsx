import React, { useState } from 'react';

const AddCategoryForm = ({ onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName) return;
    onAddCategory(categoryName);
    setCategoryName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Category</h3>
      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategoryForm;
