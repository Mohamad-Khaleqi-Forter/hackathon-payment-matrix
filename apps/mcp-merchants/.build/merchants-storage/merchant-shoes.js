"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnSaleShoes = exports.getBestSellers = exports.getShoesBySize = exports.getShoesByPriceRange = exports.getShoesByBrand = exports.getShoeById = exports.getAllShoes = exports.shoes = void 0;
exports.shoes = [
    {
        id: "prod_shoes_1",
        name: "Addidas campus Sneakers",
        description: "Classic Addidas campus sneakers with a modern twist.",
        price: 89.99,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&q=80",
        size: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        tags: ["sneakers", "shoes", "fashion", "addidas", "campus", "casual", "comfortable", "unisex", "blue"],
        bestSeller: true,
        sale: {
            salePrice: 71.99,
            percentOff: 20
        }
    },
    {
        id: "prod_shoes_2",
        name: "Addidas SL 72 OG X Liberty London Shoes",
        description: "Retro-inspired Addidas SL 72 OG shoes with Liberty London print.",
        price: 129.99,
        currency: "USD",
        size: ["US 8", "US 9", "US 10", "US 11", "US 12"],
        tags: ["sneakers", "shoes", "fashion", "addidas", "comfortable", "trendy", "men", "modern", "skyblue"],
        image: "https://images.unsplash.com/photo-1556048219-bb6978360b84?w=500&q=80",
        bestSeller: false
    },
    {
        id: "prod_shoes_3",
        name: "Terrex Anylander Mid Rain.Rdy Hiking Shoes",
        description: "Durable and waterproof hiking shoes designed for all terrains.",
        tags: ["hiking", "shoes", "outdoor", "adventure", "waterproof", "durable", "comfortable", "unisex", "black"],
        price: 159.99,
        currency: "USD",
        size: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80",
        bestSeller: true,
        sale: {
            salePrice: 119.99,
            percentOff: 25
        }
    },
    {
        id: "prod_shoes_4",
        name: "Nike Air Max 270",
        description: "Modern Nike Air Max with revolutionary Air unit for all-day comfort.",
        price: 149.99,
        currency: "USD",
        size: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
        image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&q=80",
        tags: ["sneakers", "shoes", "fashion", "nike", "air max", "sporty", "comfortable", "unisex", "white"],
        bestSeller: true
    },
    {
        id: "prod_shoes_5",
        name: "Nike Zoom Pegasus 39",
        description: "Responsive running shoes with Zoom Air cushioning for maximum performance.",
        price: 119.99,
        currency: "USD",
        size: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        tags: ["running", "shoes", "sports", "nike", "zoom", "athletic", "comfortable", "unisex", "red"],
        bestSeller: false,
        sale: {
            salePrice: 89.99,
            percentOff: 25
        }
    },
    {
        id: "prod_shoes_6",
        name: "Puma RS-X³ Puzzle",
        description: "Bold and chunky Puma sneakers with RS technology for enhanced comfort.",
        price: 109.99,
        currency: "USD",
        size: ["US 7", "US 8", "US 9", "US 10"],
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
        tags: ["sneakers", "shoes", "fashion", "puma", "retro", "casual", "comfortable", "unisex", "white"],
        bestSeller: false
    },
    {
        id: "prod_shoes_7",
        name: "Puma Suede Classic XXI",
        description: "Iconic Puma Suede sneakers with timeless design and modern comfort.",
        price: 79.99,
        currency: "USD",
        size: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"],
        image: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?w=500&q=80",
        tags: ["sneakers", "shoes", "fashion", "puma", "suede", "classic", "comfortable", "unisex", "multicolor"],
        bestSeller: true,
        sale: {
            salePrice: 59.99,
            percentOff: 25
        }
    }
];
// Helper functions
const getAllShoes = () => exports.shoes;
exports.getAllShoes = getAllShoes;
const getShoeById = (id) => exports.shoes.find(shoe => shoe.id === id);
exports.getShoeById = getShoeById;
const getShoesByBrand = (brand) => exports.shoes.filter(shoe => shoe.tags.some(tag => tag.toLowerCase() === brand.toLowerCase()));
exports.getShoesByBrand = getShoesByBrand;
const getShoesByPriceRange = (minPrice, maxPrice) => exports.shoes.filter(shoe => {
    const effectivePrice = shoe.sale ? shoe.sale.salePrice : shoe.price;
    return effectivePrice >= minPrice && effectivePrice <= maxPrice;
});
exports.getShoesByPriceRange = getShoesByPriceRange;
const getShoesBySize = (size) => exports.shoes.filter(shoe => shoe.size.includes(size.toUpperCase()));
exports.getShoesBySize = getShoesBySize;
const getBestSellers = () => exports.shoes.filter(shoe => shoe.bestSeller);
exports.getBestSellers = getBestSellers;
const getOnSaleShoes = () => exports.shoes.filter(shoe => shoe.sale);
exports.getOnSaleShoes = getOnSaleShoes;
