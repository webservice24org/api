import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/products';
import { ProductCategory } from '../../models/product-category';

@Component({
  selector: 'app-update-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})





export class UpdateProductsComponent implements OnInit {
  productList: Products[] = [];
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

  constructor(
    private service: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  



  ngOnInit(): void {

   const id = this.route.snapshot.paramMap.get('id')
   alert(id)


    // this.route.paramMap.subscribe(params => {
    //   const id = params.get('id');
    //   if (id) {
       
    //       this.service.getCategoryAndProductById(Number(id)).subscribe({
    //         next: (res) => {
    //           this.productList = res.products;
    //           this.productCategoryObj = {
    //             productCategoryID: res.productCategoryID,
    //             name: res.name,
    //             products: this.productList,
    //           };
    //         },
    //         error: (err) => {
    //           console.error('Error fetching product details:', err);
    //         }
    //       });
    //     }
      
    // });
  }

  // Update the selected product
  UpdateProduct() {
    if (this.productObj.productID) {
      this.service.updateProduct(this.productObj).subscribe({
        next: (res) => {
          alert('Product updated successfully!');
          this.resetProductForm();
          this.loadProducts();
        },
       
      });
    } else {
      alert('Please select a product to update.');
    }
  }

  // Update the selected product category
  UpdateProductCategory() {
    if (this.productCategoryObj.productCategoryID) {
      this.service.updateProductAndCategory(this.productCategoryObj.productCategoryID, this.productCategoryObj).subscribe({
        next: (res) => {
          alert('Product category updated successfully!');
          this.resetCategoryForm();
        },
        error: (err) => {
          console.error('Error updating product category:', err);
        }
      });
    } else {
      alert('Please select a category to update.');
    }
  }

  // Edit the selected product (for updating)
  editProduct(product: Products) {
    this.productObj = { ...product };
  }

  // Delete the selected product
  deleteProduct(product: Products) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.service.deleteProductWithCategory(product.productID).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.loadProducts(); // Reload the products after deletion
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  
  loadProducts() {
    this.service.getAllProductsWithCategory().subscribe({
      next: (categories) => {
        // Flatten the products from all categories
        this.productList = categories
          .map((category) => category.products || [])  // Extract the products from each category
          .flat();  // Flatten the array to get all products in a single list
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  // Reset the product form after update or addition
  resetProductForm() {
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

  // Reset the category form after update
  resetCategoryForm() {
    this.productCategoryObj = {
      productCategoryID: 0,
      name: '',
      products: [],
    };
  }
}
