"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
const productController = new productController_1.ProductController();
// Get all products
router.get('/', productController.getAllProducts.bind(productController));
// Search products with filters
router.get('/search', productController.searchProducts.bind(productController));
// Get product by ID
router.get('/:id', productController.getProductById.bind(productController));
exports.default = router;
