import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Item } from 'src/models/item';
import { PromotedItem } from 'src/models/promotedItem';
import { Promotion } from 'src/models/promotion';
import { StockStatus } from 'src/models/stockStatus';
import { ItemsService } from 'src/services/items.service';
import { PromotionService } from 'src/services/promotion.service';

import { ItemPageComponent } from '../item-page/item-page/item-page.component';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input()
  item: Item | null = null;

  @Input()
  selectedCategory: string | null = null;

  promotionsForItem: Array<Promotion> | null = null;
  discount: PromotedItem | null = null;

  rating: number = 0;
  generalStockStatus = StockStatus.OutOfStock;
  stockColour = "#f23a2f";
  hideElement = true;

  constructor(
    private router: Router, 
    private _promotionService: PromotionService, 
    private _itemsService: ItemsService,
    public dialog: MatDialog,
    ) {
  }

  ngOnInit(): void {
    if (this.item) {
      this.promotionsForItem = this._promotionService.getPromotionsForItem(this.item.id);
    }

    this.computeRating();
    this.setGeneralStockStatus();
    this.getDiscount();
  }

  computeRating() {
    let sum = 0;
    this.item?.ratings.forEach(el => sum += el.rating);

    if (this.item) {
      this.rating = sum / this.item!.ratings.length;
    }
  }

  setGeneralStockStatus() {
    this.item?.sizes.forEach(el => {
      if (el.stockStatus == StockStatus.JustAFewLeft) {
        this.generalStockStatus = StockStatus.JustAFewLeft;
        this.stockColour = "#ff8d05";
        return;
      }
    });

    this.item?.sizes.forEach(el => {
      if (el.stockStatus == StockStatus.InStock) {
        this.generalStockStatus = StockStatus.InStock;
        this.stockColour = "#43a547";
        return;
      }
    });
  }

  openDialog() {
    this.dialog.open(ItemPageComponent, {
      height: '850px',
      width: '1080px',
      data: { dataItem: this.item },
      panelClass: 'dialog'
    });
  }

  getDiscount() {
    if (this.promotionsForItem && this.item) {
      this. discount = this._itemsService.getDiscount(this.promotionsForItem, this.item)
    }
  }

  getRealPrice(item: Item) {
    return this._itemsService.getRealPrice(item, this.discount);
  }

  navigateToDetails() {
    this.router.navigate(['item', this.item?.id]);
  }
}
