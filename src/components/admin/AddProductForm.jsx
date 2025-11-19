import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const AddProductForm = ({ onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    if (!productName || !price) return;
    onAddProduct({ nombre: productName, precio: parseFloat(price) });
    setProductName('');
    setPrice('');
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Add a New Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Add Product" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
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

export default AddProductForm;
