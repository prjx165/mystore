import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SellComponent } from './components/sell/sell.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'product',component:ViewProductsComponent},
  {path:'sell',component:SellComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'profile',component:ProfileComponent},
  {path:'load',component:LoaderComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
