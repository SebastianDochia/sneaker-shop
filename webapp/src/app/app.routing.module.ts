import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { CartComponent } from './cart/cart/cart.component';
import { HomeComponent } from './home/home/home.component';
import {
  ItemPageComponent,
} from './items-page/item-page/item-page/item-page.component';
import {
  ItemsPageComponent,
} from './items-page/items-page/items-page.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'catalogue/:id', component: ItemsPageComponent},
    { path: 'item/:id', component: ItemPageComponent },
    { path: 'cart', component: CartComponent },
    { path: 'admin', component: AdminPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }