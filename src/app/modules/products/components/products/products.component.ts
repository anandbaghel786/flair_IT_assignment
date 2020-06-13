import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../../models/product.model';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  isEditMode: boolean = false;
  productList: Array<Product> = [];
  constructor(private _ngToastService: ToastrService, private productService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.productService.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAllProduct();
  }

  deleteProduct(index: number, product: Product) {
    this.productService.deleteProduct(product.id).subscribe(
      (data) => {

        setTimeout(() => {
          this.getAllProduct();
        }, 1000);
        this._ngToastService.success("Product created successfully!");
        // this.toastrService.error('Employee deleted successfully !', 'Employee CRUD');
      });
  }

  public setData(index: number, product: Product) {
    this.productService.setProductToEdit(product);
    this.isEditMode = true;
    // this.router.navigate(['product-update', product.id], { state: { product: product } });
    // this.router.navigateByUrl('product-update', { state: { product: product } });
    this.router.navigate(['/product-update', product.id])
    // let navigationExtras: NavigationExtras = {
    //   queryParams: product
    // };
    // this.router.navigate(["product-update"], navigationExtras);
  }

}
