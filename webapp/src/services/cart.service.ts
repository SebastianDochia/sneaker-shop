import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/models/cartItem';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cartItems$ = new BehaviorSubject<Array<CartItem>>([]);

    constructor(private _snackBar: MatSnackBar) { }

    addItem(id: string, size: number, price: number, discountedPrice: number | null) {
        const cartItemsData = this.cartItems$.getValue();

        discountedPrice = discountedPrice == price ? null : discountedPrice;

        cartItemsData.push({ id, size, price, discountedPrice });

        this.cartItems$.next(cartItemsData);

        this._snackBar.open(`Item added to cart`, 'OK', {duration: 2000});
    }

    removeItem(id: string) {
        const cartItemsData = this.cartItems$.getValue();

        const index = cartItemsData.indexOf(cartItemsData.filter(el => el.id == id)[0]);

        if (index > -1) {
            cartItemsData.splice(index, 1);
        }

        this.cartItems$.next(cartItemsData);

        this._snackBar.open(`Item removed from cart`, 'OK', {duration: 2000});
    }
}