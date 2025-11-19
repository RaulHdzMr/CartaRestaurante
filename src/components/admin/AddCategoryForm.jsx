import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const AddCategoryForm = ({ onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = () => {
    if (!categoryName) return;
    onAddCategory(categoryName);
    setCategoryName('');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Create a New Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Category Name"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      <Button title="Add Category" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddCategoryForm;
