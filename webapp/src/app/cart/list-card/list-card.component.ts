import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { CartItem } from 'src/models/cartItem';
import { Item } from 'src/models/item';
import { CartService } from 'src/services/cart.service';
import { ItemsService } from 'src/services/items.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {
  @Input()
  cartItem: CartItem | null = null;

  item: Item | null = null;

  constructor(private _itemsService: ItemsService, private _cartService: CartService) { }

  ngOnInit(): void {
    if (this.cartItem) {
      this.item = this._itemsService.getItem(this.cartItem.id);
    }
  }

  getTextDecoration() {
    return this.cartItem?.discountedPrice ? 'line-through' : 'none';
  }

  removeFromCart(id: string) {
    this._cartService.removeItem(id);
  }
}
