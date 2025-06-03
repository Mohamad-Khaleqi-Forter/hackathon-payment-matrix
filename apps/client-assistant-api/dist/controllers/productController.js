"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productService_1 = require("../services/productService");
const productService = new productService_1.ProductService();
class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to get products' });
        }
    }
    async searchProducts(req, res) {
        try {
            const searchParams = {
                size: req.query.size ? Number(req.query.size) : undefined,
                color: req.query.color,
                minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
                maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
                brand: req.query.brand
            };
            const products = await productService.searchProducts(searchParams);
            res.json(products);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to search products' });
        }
    }
    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to get product' });
        }
    }
}
exports.ProductController = ProductController;
