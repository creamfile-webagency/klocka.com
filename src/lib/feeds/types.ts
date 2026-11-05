export interface Product {
  id: string;
  source: string;
  merchant: string;
  brand: string;
  title: string;
  price: number;
  currency: 'SEK';
  inStock: boolean;
  image: string;
  url: string;
  gender?: 'dam' | 'herr' | 'unisex';
  strap?: 'mesh' | 'nato' | 'läder' | 'stål' | 'silikon' | string;
  color?: string;
  caseSize?: string;
  affiliate: boolean;
  updatedAt: string;
}
