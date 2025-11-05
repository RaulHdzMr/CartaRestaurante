import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !price) return;
    onAddProduct({ nombre: productName, precio: parseFloat(price) });
    setProductName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add a New Product</h4>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
