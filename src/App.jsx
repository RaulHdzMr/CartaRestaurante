import React, { useState, useEffect } from 'react';
import './App.css';
import Category from './components/Category';
import AddCategoryForm from './components/admin/AddCategoryForm';

const API_URL = 'https://jlorenzo.ddns.net/carta_restaurante';
const USER_ID = 7034;

function App() {
  const [menu, setMenu] = useState([]);

  const fetchMenu = async () => {
    try {
      const categoriesResponse = await fetch(`${API_URL}/categorias/?usuario_id=${USER_ID}`);
      const categoriesData = await categoriesResponse.json();
      const categories = categoriesData.data || [];

      const menuData = await Promise.all(
        categories.map(async (category) => {
          const productsResponse = await fetch(`${API_URL}/productos/${category.id}?usuario_id=${USER_ID}`);
          const productsData = await productsResponse.json();
          const items = productsData.data || [];
          return { ...category, items };
        })
      );

      setMenu(menuData);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addCategory = async (newCategoryName) => {
    try {
      const response = await fetch(`${API_URL}/categorias/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: USER_ID,
          nombre: newCategoryName,
        }),
      });
      if(response.ok) {
        fetchMenu();
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const updateCategory = async (categoryId, updatedCategoryName) => {
    try {
      const response = await fetch(`${API_URL}/categorias/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: USER_ID,
          nombre: updatedCategoryName,
        }),
      });
       if(response.ok) {
        fetchMenu();
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category and all its products?')) {
      try {
        const response = await fetch(`${API_URL}/categorias/${categoryId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuario_id: USER_ID
          }),
        });
         if(response.ok) {
          fetchMenu();
        }
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const addProduct = async (categoryId, newProduct) => {
    try {
      const response = await fetch(`${API_URL}/productos/${categoryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          usuario_id: USER_ID,
        }),
      });
      if(response.ok) {
        fetchMenu();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (productId, updatedProduct) => {
    try {
      const response = await fetch(`${API_URL}/productos/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...updatedProduct,
            usuario_id: USER_ID,
        }),
      });
      if(response.ok) {
        fetchMenu();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (categoryId, productId) => {
    try {
      const response = await fetch(`${API_URL}/productos/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: USER_ID
        }),
      });
       if(response.ok) {
        fetchMenu();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="App">
      <div className="menu">
        <div className="heading">
          <h1>CAMPER CAFE</h1>
          <p>Est. 2020</p>
        </div>
        <hr className="top-line" />
        {menu.map((category) => (
          <Category
            key={category.id}
            category={category.nombre}
            image={category.image}
            items={category.items}
            onUpdateCategory={(updatedCategory) => updateCategory(category.id, updatedCategory)}
            onDeleteCategory={() => deleteCategory(category.id)}
            onAddProduct={(newProduct) => addProduct(category.id, newProduct)}
            onUpdateProduct={(productId, updatedProduct) => updateProduct(productId, updatedProduct)}
            onDeleteProduct={(productId) => deleteProduct(category.id, productId)}
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
