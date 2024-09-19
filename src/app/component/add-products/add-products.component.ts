import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Products } from '../../models/products';
import { ProductCategory } from '../../models/product-category';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css',
})
export class AddProductsComponent {
  productList: Products[] = [];
  constructor(private service: ProductsService, private router: Router) {}
  productObj: Products = {
    productID: 0,
    name: '',
    productNumber: '',
    color: '',
    standardCost: 0,
    listPrice: 0,
    size: 0,
    weight: 0,
    productCategoryID: 0,
   
  };
  productCategoryObj: ProductCategory = {
    name: '',
    productCategoryID: 0,
    products: [],
  };

  AddProduct() {
    if (this.productObj.name! && this.productObj.name != null) {
      var exp = JSON.stringify(this.productObj);
      var obj = JSON.parse(exp);
      this.productList.unshift(obj);
      this.productObj = {
        productID: 0,
        name: '',
        productNumber: '',
        color: '',
        standardCost: 0,
        listPrice: 0,
        size: 0,
        weight: 0,
        productCategoryID: 0,
        
      };
    }
  }
  deleteProduct(p: Products, arry: Products[]) {
    const row = arry.findIndex(
      (op) =>
        op.name == p.name &&
        op.color == p.color &&
        op.productNumber == p.productNumber
    );
    if (row > -1) {
      arry.splice(row, 1);
    }
  }

  AddProductCategory() {
    const cate: ProductCategory = {
      products: this.productList,
      name: this.productCategoryObj.name,
      productCategoryID: this.productCategoryObj.productCategoryID,
    };

    console.log(cate); // Log the data to check if it's correct

    this.service.addProductAndCategory(cate).subscribe({
      next: (x) => {
        this.router.navigate(['products']);
      },
      error: (err) => {
        console.error('Error occurred:', err); // Log the error
      },
    });
  }
}
