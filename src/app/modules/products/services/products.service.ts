import { Injectable } from '@angular/core';
import { Product } from '../../../models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { NgxSpinnerService } from "ngx-spinner";

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductsService {
  allProduct: Product[];
  mockUrl: string = 'http://localhost:3001/products';
  public currentProduct: Product = {
    id: null,
    name: "",
    type: "",
    color: "",
    stock_unit: null,
    sku: ""
  }

  constructor(private http: HttpClient) { }

  getAllProduct() {
    // this.ngxSpinnerService.show();
    return this.http.get<Product[]>(this.mockUrl, headerOption).subscribe(
      (data: Product[]) => {
        this.allProduct = data;
        console.table(this.allProduct);
        // setTimeout(() => {
        //   this.ngxSpinnerService.hide();
        // }, 500);
      });
  }

  getDataById(id: number) {
    // this.ngxSpinnerService.show();
    return this.http.get<Product>(this.mockUrl + '/' + id, headerOption).subscribe(
      (data: Product) => {
        this.currentProduct = data;
        console.table(this.currentProduct);
        // setTimeout(() => {
        //   this.ngxSpinnerService.hide();
        // }, 500);
      });
  }

  deleteProduct(id: Number): Observable<Product> {
    return this.http.delete<Product>(this.mockUrl + '/' + id, headerOption);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.mockUrl, product, headerOption);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.mockUrl + '/' + product.id, product, headerOption);
  }

  setProductToEdit(product: Product) {
    this.currentProduct = product;
  }

  getProductToEdit() {
    return this.currentProduct;
  }
}
