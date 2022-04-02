import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Item } from 'src/models/item';
import { StockStatus } from 'src/models/stockStatus';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input()
  item: Item | null = null;
  
  rating: number = 0;
  generalStockStatus = StockStatus.OutOfStock;
  hideElement = true;

  constructor() {
  }
  
  ngOnInit(): void {
    this.computeRating();
    this.setGeneralStockStatus();
  }

  computeRating() {
    let sum = 0;
    this.item?.ratings.forEach(el => sum += el.rating);

    if(this.item) {
      this.rating = sum/this.item!.ratings.length;
    }
  }

  setGeneralStockStatus() {

  }
}
