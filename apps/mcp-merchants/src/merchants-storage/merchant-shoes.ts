interface Shoe {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  tags: string[];
}

export const shoes: Shoe[] = [
  {
    id: "prod_shoes_1",
    name: "Addidas campus Sneakers",
    description: "Classic Addidas campus sneakers with a modern twist.",
    price: 89.99,
    currency: "USD",
    image: "",
    tags: ["sneakers", "shoes", "fashion", "addidas", "campus", "casual", "comfortable", "unisex", "blue"]
  },
  {
    id: "prod_shoes_2",
    name: "Addidas SL 72 OG X Liberty London Shoes",
    description: "Retro-inspired Addidas SL 72 OG shoes with Liberty London print.", 
    price: 129.99,
    currency: "USD",
    tags: ["sneakers", "shoes", "fashion", "addidas", "comfortable", "trendy", "men",  "modern", "skyblue"],
    image: ""
  },
  {
    id: "prod_shoes_3",
    name: "Terrex Anylander Mid Rain.Rdy Hiking Shoes",
    description: "Durable and waterproof hiking shoes designed for all terrains.",
    tags: ["hiking", "shoes", "outdoor", "adventure", "waterproof", "durable", "comfortable", "unisex", "black"],
    price: 159.99,
    currency: "USD",
    image: ""
  },
  {
    id: "prod_shoes_4",
    name: "Nike Air Max 270",
    description: "Modern Nike Air Max with revolutionary Air unit for all-day comfort.",
    price: 149.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&q=80",
    tags: ["sneakers", "shoes", "fashion", "nike", "air max", "sporty", "comfortable", "unisex", "white"]
  },
  {
    id: "prod_shoes_5",
    name: "Nike Zoom Pegasus 39",
    description: "Responsive running shoes with Zoom Air cushioning for maximum performance.",
    price: 119.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    tags: ["running", "shoes", "sports", "nike", "zoom", "athletic", "comfortable", "unisex", "red"]
  },
  {
    id: "prod_shoes_6",
    name: "Puma RS-X³ Puzzle",
    description: "Bold and chunky Puma sneakers with RS technology for enhanced comfort.",
    price: 109.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
    tags: ["sneakers", "shoes", "fashion", "puma", "retro", "casual", "comfortable", "unisex", "white"]
  },
  {
    id: "prod_shoes_7",
    name: "Puma Suede Classic XXI",
    description: "Iconic Puma Suede sneakers with timeless design and modern comfort.",
    price: 79.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?w=500&q=80",
    tags: ["sneakers", "shoes", "fashion", "puma", "suede", "classic", "comfortable", "unisex", "multicolor"]
  }
];

// Export types
export type { Shoe };

// Helper functions
export const getAllShoes = (): Shoe[] => shoes;

export const getShoeById = (id: string): Shoe | undefined => 
  shoes.find(shoe => shoe.id === id);

export const getShoesByBrand = (brand: string): Shoe[] =>
  shoes.filter(shoe => 
    shoe.tags.some(tag => tag.toLowerCase() === brand.toLowerCase())
  );

export const getShoesByPriceRange = (minPrice: number, maxPrice: number): Shoe[] =>
  shoes.filter(shoe => 
    shoe.price >= minPrice && shoe.price <= maxPrice
  ); 