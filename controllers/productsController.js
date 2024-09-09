const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productos.json');

const getProducts = (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  res.json(products);
};

const getProductById = (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const product = products.find(p => p.id === req.params.pid);
  product ? res.json(product) : res.status(404).send('Producto no encontrado');
};

const createProduct = (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const newProduct = { id: Date.now().toString(), ...req.body };
  products.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const index = products.findIndex(p => p.id === req.params.pid);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.json(products[index]);
  } else {
    res.status(404).send('Producto no encontrado');
  }
};

const deleteProduct = (req, res) => {
  let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  products = products.filter(p => p.id !== req.params.pid);
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  res.send('Producto eliminado');
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
