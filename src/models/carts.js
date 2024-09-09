const fs = require('fs');
const path = require('path');

const carritoFilePath = path.join(__dirname, '../data/carrito.json');


const getAllCarts = () => {
  const data = fs.readFileSync(carritoFilePath, 'utf-8');
  return JSON.parse(data);
};

const saveCarts = (carts) => {
  fs.writeFileSync(carritoFilePath, JSON.stringify(carts, null, 2));
};

const getCartById = (id) => {
  const carts = getAllCarts();
  return carts.find(cart => cart.id === id);
};


const createCart = () => {
  const carts = getAllCarts();
  const newCart = { id: generateId(carts), products: [] };
  carts.push(newCart);
  saveCarts(carts);
  return newCart;
};


const addProductToCart = (cartId, product) => {
  const carts = getAllCarts();
  const cart = carts.find(cart => cart.id === cartId);
  if (cart) {
    const existingProduct = cart.products.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.products.push(product);
    }
    saveCarts(carts);
    return cart;
  }
  return null;
};


const getProductsInCart = (cartId) => {
  const cart = getCartById(cartId);
  return cart ? cart.products : [];
};


const generateId = (carts) => {
  return carts.length ? Math.max(...carts.map(cart => cart.id)) + 1 : 1;
};

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  addProductToCart,
  getProductsInCart,
};
