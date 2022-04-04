import { Component } from '@angular/core';

import { Subject } from 'rxjs';
import { CartItem } from 'src/models/cartItem';
import { Promotion } from 'src/models/promotion';
import { CartService } from 'src/services/cart.service';
import { PromotionService } from 'src/services/promotion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'webapp';
  activePromotions$ = new Subject<Array<Promotion>>();
  cartItemsCount = 0;

  constructor(
    private _promotionService: PromotionService,
    private _cartService: CartService,
  ) { }

  ngOnInit() {
    this.activePromotions$ = this._promotionService.activePromotions$;
    this._cartService.cartItems$.subscribe(data => this.cartItemsCount = this.getItemsCount(data));
  }

  getItemsCount(items: CartItem[] | null) {
    return items ? items.length : 0;
  }
}
