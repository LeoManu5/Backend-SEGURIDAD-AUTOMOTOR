const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const path = require('path');


const readProductsFromFile = async () => {
    const data = await fs.readFile(path.join(__dirname, '../data/products.json'));
    return JSON.parse(data);
};


router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, query = '', sort } = req.query;
        const products = await readProductsFromFile();
        
        
        const filteredProducts = products.filter(product =>
            product.category.includes(query) || product.available.toString() === query
        );

        
        if (sort === 'asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

       
        const totalProducts = filteredProducts.length;
        const totalPages = Math.ceil(totalProducts / limit);
        const currentPage = Number(page);
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + Number(limit);
        const productsToReturn = filteredProducts.slice(startIndex, endIndex);

        res.json({
            status: 'success',
            payload: productsToReturn,
            totalPages,
            prevPage: currentPage > 1 ? currentPage - 1 : null,
            nextPage: currentPage < totalPages ? currentPage + 1 : null,
            page: currentPage,
            hasPrevPage: currentPage > 1,
            hasNextPage: currentPage < totalPages,
            prevLink: currentPage > 1 ? `/api/products?page=${currentPage - 1}&limit=${limit}` : null,
            nextLink: currentPage < totalPages ? `/api/products?page=${currentPage + 1}&limit=${limit}` : null,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
