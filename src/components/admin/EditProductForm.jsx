import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const EditProductForm = ({ productName, productPrice, onUpdate, onCancel }) => {
  const [name, setName] = useState(productName);
  const [price, setPrice] = useState(String(productPrice));

  const handleSubmit = () => {
    // Basic validation
    if (!name || !price || isNaN(price)) {
      alert('Please enter a valid name and price.');
      return;
    }
    onUpdate({ nombre: name, precio: parseFloat(price) });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Edit Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
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
    padding: 10,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginVertical: 10,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
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

export default EditProductForm;
