import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

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

  @Input()
  selectedCategory: string | null = null;

  rating: number = 0;
  generalStockStatus = StockStatus.OutOfStock;
  stockColour = "#f23a2f";
  hideElement = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.computeRating();
    this.setGeneralStockStatus();
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

  }

  navigateToDetails() {
    this.router.navigate(['item', this.item?.id]);
  }
}
