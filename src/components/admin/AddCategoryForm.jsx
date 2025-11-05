import React, { useState } from 'react';

const AddCategoryForm = ({ onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName) return;
    onAddCategory({ category: categoryName, image, items: [] });
    setCategoryName('');
    setImage('');
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
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategoryForm;
