import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/product-category';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
 
    updateProduct(product: Products): Observable<Products> {
      const url = `${this.baseUrl}/${product.productID}`;
      return this.http.put<Products>(url, product);
    }
  baseUrl: string = 'https://localhost:7115/ProductCategories';
  constructor(private http: HttpClient) {}

  getAllProductsWithCategory(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.baseUrl);
  }
  deleteProductWithCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addProductAndCategory( category: ProductCategory ): Observable<ProductCategory> {
    console.log(category);
    return this.http.post<ProductCategory>(this.baseUrl, category);
  }
  getCategoryAndProductById(cateId:number){
    return this.http.get<ProductCategory>(this.baseUrl+`/${cateId}`)
  }
  updateProductAndCategory(cateId:number,category:ProductCategory):Observable<ProductCategory>{
    return this.http.put<ProductCategory>(this.baseUrl+`/${cateId}`,category)
  }
  
}


