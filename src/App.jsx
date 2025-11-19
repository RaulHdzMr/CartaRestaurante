import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Category from './components/Category';
import AddCategoryForm from './components/admin/AddCategoryForm';
import { fetchMenuData, updateCategory as apiUpdateCategory, deleteCategory as apiDeleteCategory, updateProduct as apiUpdateProduct } from './api/menuApi';

// Image assets
import coffeeImage from './assets/coffee.jpg';
import pieImage from './assets/pie.jpg';
import beansImage from './assets/beans.jpg';

// Image mapping remains in the UI layer
const categoryImages = {
  'food': coffeeImage,
  'desserts': pieImage,
};

function App() {
  const [menu, setMenu] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const fetchMenu = async () => {
    const menuData = await fetchMenuData();
    const menuWithImages = menuData.map(category => ({
      ...category,
      categoryImage: getImageForCategory(category.nombre),
    }));
    setMenu(menuWithImages);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const getImageForCategory = (categoryName) => {
    if (typeof categoryName !== 'string') return null;
    const cleanedName = categoryName.trim().toLowerCase();
    return categoryImages[cleanedName] || null;
  };

  const handleUpdateCategory = async (categoryId, updatedName) => {
    const success = await apiUpdateCategory(categoryId, updatedName);
    if (success) fetchMenu();
  };

  const handleDeleteCategory = (categoryId, categoryName) => {
    Alert.alert(
      `Delete ${categoryName}`,
      'Are you sure you want to delete this category and all its products?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            const success = await apiDeleteCategory(categoryId);
            if (success) fetchMenu();
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleUpdateProduct = async (productId, updatedProductData) => {
    const success = await apiUpdateProduct(productId, updatedProductData);
    if (success) {
      fetchMenu(); // Refresh the entire menu to show the updated product
    } else {
      Alert.alert('Error', 'Failed to update the product. Please try again.');
    }
  };
  
  const handleAddCategory = async (newCategoryName) => { /* Placeholder */ };

  return (
    <ImageBackground source={beansImage} style={styles.appBackground}>
      <SafeAreaView style={styles.app}>
        <ScrollView>
          <View style={styles.menu}>
            <View style={styles.heading}>
              <Text style={styles.title}>CAMPER CAFE</Text>
              <Text style={styles.established}>Est. 2020</Text>
              <TouchableOpacity onPress={() => setEditMode(!editMode)} style={styles.button}>
                <Text style={styles.buttonText}>{editMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            {menu.map((category) => (
              <Category
                key={category.id}
                category={category.nombre}
                categoryImage={category.categoryImage}
                items={category.items}
                editMode={editMode}
                onUpdateCategory={(updatedName) => handleUpdateCategory(category.id, updatedName)}
                onDeleteCategory={() => handleDeleteCategory(category.id, category.nombre)}
                onUpdateProduct={handleUpdateProduct} // Pass the handler down
              />
            ))}
            {editMode && <AddCategoryForm onAddCategory={handleAddCategory} />}
            <View style={styles.divider} />
            <View style={styles.footer}>
              <Text style={styles.footerText}>Thanks for visiting!</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  appBackground: { flex: 1, resizeMode: 'cover' },
  app: { flex: 1, backgroundColor: 'transparent' },
  menu: { margin: 20, padding: 20, backgroundColor: 'burlywood', borderRadius: 10 },
  heading: { alignItems: 'center' },
  title: { fontSize: 40, fontWeight: 'bold', color: '#333' },
  established: { fontSize: 18, fontStyle: 'italic', color: '#333' },
  button: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', textAlign: 'center' },
  divider: { borderBottomColor: '#8C6D46', borderBottomWidth: 1, marginVertical: 20 },
  footer: { alignItems: 'center', marginTop: 20 },
  footerText: { color: '#333' },
});

export default App;
