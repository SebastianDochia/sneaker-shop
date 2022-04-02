import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CartComponent } from './cart/cart/cart.component';
import { HomeComponent } from './home/home/home.component';
import { ItemCardComponent } from './items-page/item-card/item-card.component';
import {
  ItemPageComponent,
} from './items-page/item-page/item-page/item-page.component';
import {
  ItemsPageComponent,
} from './items-page/items-page/items-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsPageComponent,
    HomeComponent,
    ItemPageComponent,
    AdminPageComponent,
    CartComponent,
    ItemCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
