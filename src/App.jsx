import React, { useState } from 'react';
import './App.css';
import Category from './components/Category';
import menuData from './menu.json';
import AddCategoryForm from './components/admin/AddCategoryForm';

function App() {
  const [menu, setMenu] = useState(menuData);

  const addCategory = (newCategory) => {
    setMenu([...menu, newCategory]);
  };

  const updateCategory = (originalCategoryName, updatedCategory) => {
    setMenu(
      menu.map((category) =>
        category.category === originalCategoryName ? updatedCategory : category
      )
    );
  };

  const deleteCategory = (categoryName) => {
    if (window.confirm('Are you sure you want to delete this category and all its products?')) {
      setMenu(menu.filter((category) => category.category !== categoryName));
    }
  };

  const addProduct = (categoryName, newProduct) => {
    setMenu(
      menu.map((category) =>
        category.category === categoryName
          ? { ...category, items: [...category.items, newProduct] }
          : category
      )
    );
  };

  const updateProduct = (categoryName, originalProductName, updatedProduct) => {
    setMenu(
      menu.map((category) =>
        category.category === categoryName
          ? {
              ...category,
              items: category.items.map((item) =>
                item.name === originalProductName ? updatedProduct : item
              ),
            }
          : category
      )
    );
  };

  const deleteProduct = (categoryName, productName) => {
    setMenu(
      menu.map((category) =>
        category.category === categoryName
          ? { ...category, items: category.items.filter((item) => item.name !== productName) }
          : category
      )
    );
  };

  return (
    <div className="App">
      <div className="menu">
        <div className="heading">
          <h1>CAMPER CAFE</h1>
          <p>Est. 2020</p>
        </div>
        <hr className="top-line" />
        {menu.map((category, index) => (
          <Category
            key={index}
            category={category.category}
            image={category.image}
            items={category.items}
            onUpdateCategory={(updatedCategory) => updateCategory(category.category, updatedCategory)}
            onDeleteCategory={deleteCategory}
            onAddProduct={addProduct}
            onUpdateProduct={(originalProductName, updatedProduct) => updateProduct(category.category, originalProductName, updatedProduct)}
            onDeleteProduct={deleteProduct}
          />
        ))}
        <AddCategoryForm onAddCategory={addCategory} />
        <hr className="bottom-line" />
        <div className="footer">
          <a href="#">Visit our website</a>
          <p>123 Free Code Camp Drive</p>
        </div>
      </div>
    </div>
  );
}

export default App;
