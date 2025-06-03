import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';

const router = Router();
const productController = new ProductController();

// Get all products
router.get('/', productController.getAllProducts.bind(productController));

// Search products with filters
router.get('/search', productController.searchProducts.bind(productController));

// Get product by ID
router.get('/:id', productController.getProductById.bind(productController));

export default router; 