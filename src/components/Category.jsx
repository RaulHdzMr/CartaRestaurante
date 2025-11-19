import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MenuItem from './MenuItem';
import EditCategoryForm from './admin/EditCategoryForm';

// This component now also passes the product update handler to its children.
const Category = ({
  category,
  categoryImage,
  items,
  editMode,
  onUpdateCategory,
  onDeleteCategory,
  onUpdateProduct, // Receive the product update handler
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateCategory = (updatedName) => {
    onUpdateCategory(updatedName);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.categorySection}>
      {isEditing && editMode ? (
        <EditCategoryForm
          initialCategoryName={category}
          onUpdateCategory={handleUpdateCategory}
          onCancel={handleCancelEdit}
        />
      ) : (
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {categoryImage && <Image source={categoryImage} style={styles.icon} />}
        </View>
      )}

      {editMode && !isEditing && (
        <View style={styles.adminButtons}>
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.button}>
            <Text style={styles.buttonText}>Edit Name</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteCategory} style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>Delete Category</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Pass the necessary props down to each MenuItem */}
      {items.map((item) => (
        <MenuItem
          key={item.id}
          name={item.nombre}
          price={item.precio}
          editMode={editMode}
          // Pass a function that calls the handler with the item's ID
          onUpdateProduct={(updatedProduct) => onUpdateProduct(item.id, updatedProduct)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    width: 50,
    height: 50,
  },
  adminButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5D4037',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Category;
