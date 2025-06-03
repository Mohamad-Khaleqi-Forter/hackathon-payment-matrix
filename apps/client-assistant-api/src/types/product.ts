export interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  size: number;
  color: string;
  inStock: boolean;
  merchantId: string;
}

export interface ProductSearchParams {
  size?: number;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
} 