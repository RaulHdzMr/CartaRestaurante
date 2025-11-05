import React, { useState } from 'react';

const EditProductForm = ({ product, onUpdateProduct, onCancel }) => {
  const [productName, setProductName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !price) return;
    onUpdateProduct({ ...product, name: productName, price: parseFloat(price) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Edit Product</h4>
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
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditProductForm;
