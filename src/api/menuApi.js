const API_URL = 'https://jlorenzo.ddns.net/carta_restaurante';
const USER_ID = 7034;

/**
 * Fetches the full menu data, including categories and their products.
 * @returns {Promise<Array>} A promise that resolves to an array of categories with their items.
 */
export const fetchMenuData = async () => {
  try {
    const categoriesResponse = await fetch(`${API_URL}/categorias/?usuario_id=${USER_ID}`);
    const categoriesData = await categoriesResponse.json();
    const categories = categoriesData.data || [];

    return Promise.all(
      categories.map(async (category) => {
        const productsResponse = await fetch(`${API_URL}/productos/${category.id}?usuario_id=${USER_ID}`);
        const productsData = await productsResponse.json();
        const items = productsData.data || [];
        return { ...category, items };
      })
    );
  } catch (error) {
    console.error('Error fetching menu:', error);
    return []; // Return an empty array on error
  }
};

/**
 * Updates a category's name.
 * @param {number} categoryId The ID of the category to update.
 * @param {string} updatedCategoryName The new name for the category.
 * @returns {Promise<boolean>} A promise that resolves to true if the update was successful, false otherwise.
 */
export const updateCategory = async (categoryId, updatedCategoryName) => {
  try {
    const response = await fetch(`${API_URL}/categorias/${categoryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario_id: USER_ID,
        nombre: updatedCategoryName,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error updating category:', error);
    return false;
  }
};

/**
 * Deletes a category.
 * @param {number} categoryId The ID of the category to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful, false otherwise.
 */
export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_URL}/categorias/${categoryId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario_id: USER_ID }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
};

/**
 * Updates a product's details.
 * @param {number} productId The ID of the product to update.
 * @param {object} updatedProduct The object containing the new name and price.
 * @returns {Promise<boolean>} A promise that resolves to true if the update was successful, false otherwise.
 */
export const updateProduct = async (productId, updatedProduct) => {
  try {
    const response = await fetch(`${API_URL}/productos/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario_id: USER_ID,
        ...updatedProduct, // Spread the updated name and price
      }),
    });
    return response.ok;
  } catch (error) {
    console.error(`Error updating product ${productId}:`, error);
    return false;
  }
};
