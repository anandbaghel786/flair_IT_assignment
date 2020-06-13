import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/components/product-detail/product-detail.component';
import { ProductsService } from './services/products.service';



@NgModule({
  declarations: [ProductsComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [ProductsService],
})
export class ProductsModule { }
