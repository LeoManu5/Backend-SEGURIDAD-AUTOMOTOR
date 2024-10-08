const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const path = require('path');

// Helper function to read carts from JSON file
const readCartsFromFile = async () => {
    const data = await fs.readFile(path.join(__dirname, '../data/carts.json'));
    return JSON.parse(data);
};

// DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const carts = await readCartsFromFile();
        const cart = carts.find(cart => cart.id === cid);

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        cart.products = cart.products.filter(product => product.id !== pid);
        await fs.writeFile(path.join(__dirname, '../data/carts.json'), JSON.stringify(carts));
        res.json({ status: 'success', message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// PUT /api/carts/:cid
router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const newProducts = req.body.products;
        const carts = await readCartsFromFile();
        const cart = carts.find(cart => cart.id === cid);

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        cart.products = newProducts;
        await fs.writeFile(path.join(__dirname, '../data/carts.json'), JSON.stringify(carts));
        res.json({ status: 'success', message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// PUT /api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const carts = await readCartsFromFile();
        const cart = carts.find(cart => cart.id === cid);

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        const product = cart.products.find(p => p.id === pid);
        if (product) {
            product.quantity = quantity;
        }

        await fs.writeFile(path.join(__dirname, '../data/carts.json'), JSON.stringify(carts));
        res.json({ status: 'success', message: 'Product quantity updated' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// DELETE /api/carts/:cid
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const carts = await readCartsFromFile();
        const cartIndex = carts.findIndex(cart => cart.id === cid);

        if (cartIndex === -1) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        carts.splice(cartIndex, 1);
        await fs.writeFile(path.join(__dirname, '../data/carts.json'), JSON.stringify(carts));
        res.json({ status: 'success', message: 'All products removed from cart' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
