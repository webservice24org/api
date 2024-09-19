import { Routes } from '@angular/router';
import { IndexProductsComponent } from './component/index-products/index-products.component';
import { AddProductsComponent } from './component/add-products/add-products.component';
import { UpdateProductsComponent } from './component/update-products/update-products.component';

export const routes: Routes = [
  { path: '', component: IndexProductsComponent },
  { path: 'products', component: IndexProductsComponent },
  { path: 'addProduct', component: AddProductsComponent },

  { path: 'addProduct/edit/:id', component: UpdateProductsComponent },
];
