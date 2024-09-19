import { Products } from './products';

export interface ProductCategory {
  productCategoryID: number;
  name: string;
  products: Products[];
}
