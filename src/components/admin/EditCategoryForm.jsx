import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const EditCategoryForm = ({ initialCategoryName, onUpdateCategory, onCancel }) => {
  const [categoryName, setCategoryName] = useState(initialCategoryName);

  const handleSubmit = () => {
    if (!categoryName) return;
    onUpdateCategory(categoryName);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Edit Category Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Category Name"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      <View style={styles.buttonGroup}>
        <Button title="Update" onPress={handleSubmit} />
        <Button title="Cancel" onPress={onCancel} color="#f44336" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    backgroundColor: '#F5DEB3', // A slightly lighter shade of burlywood for contrast
    borderRadius: 8,
    marginVertical: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#8C6D46', // Using a border color that matches the app's theme
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default EditCategoryForm;
