import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Item } from 'src/models/item';
import { StockStatus } from 'src/models/stockStatus';
import { ItemsService } from 'src/services/items.service';

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

  constructor(private activatedRoute: ActivatedRoute, private _itemsService: ItemsService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.itemId = params.id;
    });

    this.item = this._itemsService.getitem(this.itemId);

    this.computeRating()
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
  
  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
