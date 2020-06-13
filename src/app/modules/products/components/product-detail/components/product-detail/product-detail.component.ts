import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../../../../models/product.model';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, timeInterval } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = false;
  currentProduct: any = {};
  currentProductId: any;
  private state$: any;
  constructor(private _ngToastService: ToastrService, private formBuilder: FormBuilder, private productService: ProductsService, private router: Router, private activatedRouterService: ActivatedRoute) {
    // if (this.router.getCurrentNavigation().extras.state) {
    //   this.currentProduct = this.router.getCurrentNavigation().extras.state
    // }
  }

  ngOnInit() {

    this.productForm = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      type: ["", Validators.required],
      color: ["", Validators.required],
      stock_unit: [0, [Validators.required]],
      sku: ["", Validators.required]
      // skilldetail: this.formBuilder.array([this.createItem()])
    })

    // this.state$ = this.router.events.pipe(
    //   filter(e => e instanceof NavigationStart),
    //   map(() => this.router.getCurrentNavigation().extras.state),
    // )
    console.log(this.currentProduct)
    if (this.activatedRouterService.snapshot.params.id) {
      // this.currentProduct = this.productService.getProductToEdit();
      this.productService.getDataById(this.activatedRouterService.snapshot.params.id)
      console.log(this.productService.currentProduct);
      setTimeout(() => {
        this.productForm.setValue(this.productService.currentProduct);
        this.isEditMode = true;
      }, 500);

    }

    // this.createProduct();
    // if (this.currentProduct && !this.currentProduct.id) {
    //   console.log("###########################################")
    //   this.createProduct();
    // } else {
    //   console.log("3333333333333333333333333333333333333333333")
    //   this.productForm.setValue(this.currentProduct);
    //   this.updateProduct(this.currentProduct);
    // }
  }

  get f() { return this.productForm.controls; }

  // editProduct(product: Product) {
  //   this.productService.currentProduct = Object.assign({}, product);
  //   // this.toastrService.warning('Product edited successfully !', 'Product CRUD');
  // }

  createProduct() {
    this.productService.createProduct(this.productForm.value).subscribe(
      (result: Product) => {
        this.productService.getAllProduct();
        this._ngToastService.success("Product created successfully!");
        this.clearProduct();
        this.router.navigate(["products"])
      });
  }

  updateProduct() {
    this.productService.updateProduct(this.productForm.value).subscribe(
      (result: Product) => {
        this.productService.getAllProduct();
        // this.toastrService.info('Product updated successfully !', 'Product CRUD');
        this.clearProduct();
        this.isEditMode = false;
        this._ngToastService.success("Product updated successfully!");
        this.router.navigate(["products"])
      });
  }

  clearProduct() {
    this.productForm.reset();
  }



}
