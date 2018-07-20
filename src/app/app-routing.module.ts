import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleComponent } from './console/console.component';
import { LoginComponent } from './login/login.component';
import { CategoryManagerComponent } from './category-manager/category-manager.component';
import { LinksManagerComponent } from './links-manager/links-manager.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import { BannerManagerComponent } from './banner-manager/banner-manager.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/console',pathMatch: 'full'},
  { path:'console', component:ConsoleComponent, canActivate:[AuthGuard]},
  { path:'editProduct', component:EditProductComponent, canActivate:[AuthGuard]},
  { path:'orderManager', component:OrderManagerComponent, canActivate:[AuthGuard]},
  { path:'linksManager', component:LinksManagerComponent, canActivate:[AuthGuard]},
  { path:'bannerManager', component:BannerManagerComponent, canActivate:[AuthGuard]},
  { path:'categoryManager', component:CategoryManagerComponent, canActivate:[AuthGuard]},
  { path:'bankAccount', component:BankAccountComponent, canActivate:[AuthGuard]},
  { path:'login', component:LoginComponent},
  { path: "**", component:PageNotFoundComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  ConsoleComponent,
  EditProductComponent,
  LoginComponent,
  OrderManagerComponent,
  BannerManagerComponent,
  CategoryManagerComponent,
  LinksManagerComponent,
  BankAccountComponent,
  PageNotFoundComponent]
