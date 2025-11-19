import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EditProductForm from './admin/EditProductForm';

const MenuItem = ({ name, price, editMode, onUpdateProduct }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedProduct) => {
    onUpdateProduct(updatedProduct);
    setIsEditing(false); // Exit editing mode on successful update
  };

  return (
    <View style={styles.menuItem}>
      {isEditing && editMode ? (
        <EditProductForm
          productName={name}
          productPrice={price}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{name}</Text>
          {/* Robust price display to prevent crashes from undefined/invalid data */}
          <Text style={styles.itemPrice}>${(Number(price) || 0).toFixed(2)}</Text>
        </View>
      )}

      {editMode && !isEditing && (
        <View style={styles.adminControls}>
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adminControls: {
    marginLeft: 15,
  },
  button: {
    backgroundColor: '#FBC02D', // A fitting yellow for edit
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default MenuItem;
