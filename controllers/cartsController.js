const fs = require('fs');
const path = require('path');
const cartsFilePath = path.join(__dirname, '../data/carrito.json');

const createCart = (req, res) => {
  const carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
  const newCart = { id: Date.now().toString(), products: [] };
  carts.push(newCart);
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
  res.status(201).json(newCart);
};

const getCartById = (req, res) => {
  const carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
  const cart = carts.find(c => c.id === req.params.cid);
  cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
};

const addProductToCart = (req, res) => {
  const carts = JSON.parse(fs.readFileSync(cartsFilePath, 'utf-8'));
  const cart = carts.find(c => c.id === req.params.cid);
  if (cart) {
    const existingProduct = cart.products.find(p => p.product === req.params.pid);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    res.json(cart);
  } else {
    res.status(404).send('Carrito no encontrado');
  }
};

module.exports = { createCart, getCartById, addProductToCart };
