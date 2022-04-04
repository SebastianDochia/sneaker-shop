import {
  Component,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';
import { CartItem } from 'src/models/cartItem';
import { Item } from 'src/models/item';
import { PaymentType } from 'src/models/paymentType';
import { Promotion } from 'src/models/promotion';
import { CartService } from 'src/services/cart.service';
import { ItemsService } from 'src/services/items.service';
import { PromotionService } from 'src/services/promotion.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  paymentTypes = PaymentType;
  activePromotions$ = new Subject<Array<Promotion>>();
  items$ = new Subject<Array<Item>>();
  cartItems: CartItem[] = [];
  cartItemsCount = 0;
  price = 0;
  discountedPrice = 0;
  paymentType = PaymentType.Card;

  constructor(
    private _promotionService: PromotionService,
    private _cartService: CartService,
    private _itemsService: ItemsService,
  ) { }

  ngOnInit() {
    this.items$ = this._itemsService.items$;
    this.activePromotions$ = this._promotionService.activePromotions$;
    this._cartService.cartItems$.subscribe(data => {
      this.cartItemsCount = this.getItemsCount(data);
      this.cartItems = data;

      let newPrice = 0;
      let newDiscountedPrice = 0;

      data.forEach(el => {
        newPrice += el.price;
        newDiscountedPrice += el.discountedPrice ? el.discountedPrice : el.price;
      });

      this.price = newPrice;
      this.discountedPrice = newDiscountedPrice;
    });
  }

  getItemsCount(items: CartItem[] | null) {
    return items ? items.length : 0;
  }

  selectPaymentType(type: PaymentType) {
    this.paymentType = type;
  }

  isCartEmpty() {
    return this.cartItems.length ? false : true;
  }
}
