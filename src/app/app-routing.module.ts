import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/components/home.component';
import { UserDashboardComponent } from './modules/users/components/user-dashboard/user-dashboard.component';
import { ProductsComponent } from './modules/products/components/products/products.component';
import { ProductDetailComponent } from './modules/products/components/product-detail/components/product-detail/product-detail.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './modules/users/components/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "registration", component: ProfileComponent },
  { path: "profile/:userid", component: ProfileComponent },
  { path: "dashboard", component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: "products", component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "product-create", component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: "product-update/:id", component: ProductDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
