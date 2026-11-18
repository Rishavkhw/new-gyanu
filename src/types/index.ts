export type PortfolioCategory =
  | 'All'
  | 'Weddings'
  | 'Portraits'
  | 'Pre-Wedding'
  | 'Events'
  | 'Fashion'
  | 'Nature'
  | 'Product Photography';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'All'>;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
  location?: string;
  caption: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  startingPrice: number;
  image: string;
  deliverables: string[];
  featured?: boolean;
}

export type ProductCategory =
  | 'All'
  | 'Photo Frames'
  | 'Printed Photographs'
  | 'Photo Albums'
  | 'Customized Gifts'
  | 'Canvas Prints'
  | 'Personalized Photo Gifts'
  | 'Photography Accessories'
  | 'Bouquet';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  dimensions?: string;
  material?: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  service: string;
  quote: string;
}
