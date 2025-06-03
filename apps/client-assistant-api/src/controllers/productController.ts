import { Request, Response } from 'express';
import { ProductService } from '../services/productService.js';
import { ProductSearchParams } from '../types/product.js';

const productService = new ProductService();

export class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get products' });
    }
  }

  async searchProducts(req: Request, res: Response) {
    try {
      const searchParams: ProductSearchParams = {
        size: req.query.size ? Number(req.query.size) : undefined,
        color: req.query.color as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        brand: req.query.brand as string
      };

      const products = await productService.searchProducts(searchParams);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search products' });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get product' });
    }
  }
} 