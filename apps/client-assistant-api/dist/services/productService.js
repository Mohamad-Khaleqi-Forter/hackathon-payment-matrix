"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
// Mock data for demonstration
const mockProducts = [
    {
        id: '1',
        name: 'Nike Air Max',
        description: 'Classic running shoes with air cushioning',
        brand: 'Nike',
        price: 129.99,
        size: 9,
        color: 'Black',
        inStock: true,
        merchantId: 'merchant1'
    },
    {
        id: '2',
        name: 'Adidas Ultraboost',
        description: 'Premium running shoes with responsive boost technology',
        brand: 'Adidas',
        price: 159.99,
        size: 9,
        color: 'White',
        inStock: true,
        merchantId: 'merchant2'
    }
];
class ProductService {
    async getAllProducts() {
        return mockProducts;
    }
    async searchProducts(params) {
        return mockProducts.filter(product => {
            if (params.size && product.size !== params.size)
                return false;
            if (params.color && product.color.toLowerCase() !== params.color.toLowerCase())
                return false;
            if (params.minPrice && product.price < params.minPrice)
                return false;
            if (params.maxPrice && product.price > params.maxPrice)
                return false;
            if (params.brand && product.brand.toLowerCase() !== params.brand.toLowerCase())
                return false;
            return true;
        });
    }
    async getProductById(id) {
        return mockProducts.find(product => product.id === id);
    }
}
exports.ProductService = ProductService;
