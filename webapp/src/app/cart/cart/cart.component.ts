import {
  Component,
  OnInit,
} from '@angular/core';

import {
  ICreateOrderRequest,
  IPayPalConfig,
} from 'ngx-paypal';
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

  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean = false;

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

      this.initConfig();
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

  private initConfig(): void {
    const items: any = [];

    this.cartItems.forEach(el => {
      const currentItem = this._itemsService.getItem(el.id);

      items.push({
        name: currentItem.name,
        quantity: '1',
        category: 'DIGITAL_GOODS',
        unit_amount: {
          currency_code: 'USD',
          value: el.discountedPrice,
        },
      })
    });

    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: `${this.discountedPrice}`,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: `${this.discountedPrice}`
                }
              }
            },
            items
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
