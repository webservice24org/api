import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductCategory } from '../../models/product-category';

@Component({
  selector: 'app-index-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './index-products.component.html',
  styleUrls: ['./index-products.component.css'],
})
export class IndexProductsComponent implements OnInit {
  deleteitem(item: ProductCategory) {
    const IsConfirm = confirm(
      'Are you sure you want to delete ' + item.name + '?'
    );
    if (IsConfirm) {
      this.service
        .deleteProductWithCategory(item.productCategoryID)
        .subscribe((res) => {
          alert('Deleted Successfully');
          this.getList(); // Reload the list after deletion
        });
    }
  }

  list: ProductCategory[] = [];
  constructor(private service: ProductsService) {}
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.getAllProductsWithCategory().subscribe((res) => {
      this.list = res;
    });
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
