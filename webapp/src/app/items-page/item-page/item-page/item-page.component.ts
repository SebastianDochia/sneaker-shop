import {
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Item } from 'src/models/item';
import { PromotedItem } from 'src/models/promotedItem';
import { Promotion } from 'src/models/promotion';
import { StockStatus } from 'src/models/stockStatus';
import { CartService } from 'src/services/cart.service';
import { ItemsService } from 'src/services/items.service';
import { PromotionService } from 'src/services/promotion.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {
  private routeSub: Subscription | null = null;

  item: Item | null = null;
  itemId: string = "";
  rating: number = 0;

  selectedSize: number | undefined = undefined;
  promotionsForItem: Array<Promotion> | null = null;
  discount: PromotedItem | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _itemsService: ItemsService,
    private _promotionService: PromotionService,
    private _cartService: CartService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { dataItem: Item }
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.itemId = params.id;
    });

    this.item = this.itemId ? this._itemsService.getItem(this.itemId) : this.data.dataItem;

    if (this.item) {
      this.promotionsForItem = this._promotionService.getPromotionsForItem(this.item.id);
    }

    this.computeRating();
    this.getDiscount();
  }

  computeRating() {
    let sum = 0;
    this.item?.ratings.forEach(el => sum += el.rating);

    if (this.item) {
      this.rating = sum / this.item!.ratings.length;
    }
  }

  isNotInStock(stockStatus: StockStatus): boolean {
    return stockStatus == StockStatus.OutOfStock;
  }

  isJustAFewLeft(stockStatus: StockStatus): boolean {
    return stockStatus == StockStatus.JustAFewLeft;
  }

  selectSize(size: number) {
    this.selectedSize = size;
  }

  setColour(size: number, stockStatus: StockStatus) {
    return size != this.selectedSize && stockStatus != StockStatus.OutOfStock ? "#fff" : "#efefef";
  }

  getDiscount() {
    if (this.promotionsForItem && this.item) {
      this.discount = this._itemsService.getDiscount(this.promotionsForItem, this.item);
    }
  }

  getRealPrice(item: Item) {
    return this._itemsService.getRealPrice(item, this.discount);
  }

  addToCart(id: string, price: number, realPrice: number) {
    if (this.selectedSize) {
      this._cartService.addItem(id, this.selectedSize, price, realPrice);
    }
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
