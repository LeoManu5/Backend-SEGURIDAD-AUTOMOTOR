const fs = require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../data/productos.json');


const getAllProducts = () => {
  const data = fs.readFileSync(productosFilePath, 'utf-8');
  return JSON.parse(data);
};


const saveProducts = (products) => {
  fs.writeFileSync(productosFilePath, JSON.stringify(products, null, 2));
};


const getProductById = (id) => {
  const products = getAllProducts();
  return products.find(product => product.id === id);
};


const createProduct = (product) => {
  const products = getAllProducts();
  const newProduct = { ...product, id: generateId(products) };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};


const updateProduct = (id, updatedProduct) => {
  const products = getAllProducts();
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    saveProducts(products);
    return products[index];
  }
  return null;
};


const deleteProduct = (id) => {
  let products = getAllProducts();
  products = products.filter(product => product.id !== id);
  saveProducts(products);
  return products;
};


const generateId = (products) => {
  return products.length ? Math.max(...products.map(product => product.id)) + 1 : 1;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
