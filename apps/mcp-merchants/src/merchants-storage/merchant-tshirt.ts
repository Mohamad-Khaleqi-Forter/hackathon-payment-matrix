interface Sale {
  salePrice: number;
  percentOff: number;
}

interface Tshirt {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  size: string[];
  tags: string[];
  bestSeller: boolean;
  sale?: Sale;
}

export const tshirts: Tshirt[] = [
  {
    id: "prod_tshirt_1",
    name: "Nike Dri-FIT Running T-Shirt",
    description: "Lightweight and breathable running t-shirt with moisture-wicking technology.",
    price: 29.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80",
    size: ["S", "M", "L", "XL"],
    tags: ["sports", "running", "nike", "dri-fit", "athletic", "comfortable", "black"],
    bestSeller: true,
    sale: {
      salePrice: 23.99,
      percentOff: 20
    }
  },
  {
    id: "prod_tshirt_2",
    name: "Adidas Originals Trefoil Tee",
    description: "Classic cotton t-shirt featuring the iconic Adidas Trefoil logo.", 
    price: 24.99,
    currency: "USD",
    size: ["XS", "S", "M", "L", "XL"],
    tags: ["casual", "streetwear", "adidas", "cotton", "classic", "comfortable", "white"],
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",
    bestSeller: true
  },
  {
    id: "prod_tshirt_3",
    name: "Puma Essential Logo Tee",
    description: "Simple and stylish t-shirt with Puma cat logo print.",
    tags: ["casual", "sports", "puma", "cotton", "essential", "comfortable", "gray"],
    price: 19.99,
    currency: "USD",
    size: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
    bestSeller: false,
    sale: {
      salePrice: 14.99,
      percentOff: 25
    }
  },
  {
    id: "prod_tshirt_4",
    name: "Under Armour Tech 2.0 T-Shirt",
    description: "Quick-drying, ultra-soft training t-shirt with anti-odor technology.",
    price: 25.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80",
    size: ["S", "M", "L", "XL"],
    tags: ["sports", "training", "under-armour", "tech", "athletic", "comfortable", "blue"],
    bestSeller: true
  },
  {
    id: "prod_tshirt_5",
    name: "Champion Heritage Graphic Tee",
    description: "Vintage-inspired graphic t-shirt with classic Champion logo.",
    price: 22.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&q=80",
    size: ["S", "M", "L", "XL"],
    tags: ["casual", "streetwear", "champion", "cotton", "vintage", "comfortable", "red"],
    bestSeller: false,
    sale: {
      salePrice: 16.99,
      percentOff: 26
    }
  },
  {
    id: "prod_tshirt_6",
    name: "The North Face Simple Dome Tee",
    description: "Durable and comfortable t-shirt with classic The North Face logo.",
    price: 27.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80",
    size: ["S", "M", "L", "XL"],
    tags: ["casual", "outdoor", "north-face", "cotton", "classic", "comfortable", "green"],
    bestSeller: false
  },
  {
    id: "prod_tshirt_7",
    name: "Reebok Classic Vector Tee",
    description: "Modern take on the classic Reebok vector logo t-shirt.",
    price: 23.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&q=80",
    size: ["XS", "S", "M", "L", "XL"],
    tags: ["casual", "sports", "reebok", "cotton", "classic", "comfortable", "yellow"],
    bestSeller: true,
    sale: {
      salePrice: 17.99,
      percentOff: 25
    }
  }
];

// Export types
export type { Tshirt, Sale };

// Helper functions
export const getAllTshirts = (): Tshirt[] => tshirts;

export const getTshirtById = (id: string): Tshirt | undefined => 
  tshirts.find(tshirt => tshirt.id === id);

export const getTshirtsByBrand = (brand: string): Tshirt[] =>
  tshirts.filter(tshirt => 
    tshirt.tags.some(tag => tag.toLowerCase() === brand.toLowerCase())
  );

export const getTshirtsByPriceRange = (minPrice: number, maxPrice: number): Tshirt[] =>
  tshirts.filter(tshirt => {
    const effectivePrice = tshirt.sale ? tshirt.sale.salePrice : tshirt.price;
    return effectivePrice >= minPrice && effectivePrice <= maxPrice;
  });

export const getTshirtsBySize = (size: string): Tshirt[] =>
  tshirts.filter(tshirt => 
    tshirt.size.includes(size.toUpperCase())
  );

export const getBestSellers = (): Tshirt[] =>
  tshirts.filter(tshirt => tshirt.bestSeller);

export const getOnSaleTshirts = (): Tshirt[] =>
  tshirts.filter(tshirt => tshirt.sale); 