import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';
import { Category } from 'src/models/category';
import { Item } from 'src/models/item';
import { PromotedItem } from 'src/models/promotedItem';
import { Promotion } from 'src/models/promotion';
import { PromotionType } from 'src/models/promotionType';
import { StockStatus } from 'src/models/stockStatus';

@Injectable({
    providedIn: 'root',
})
export class ItemsService {
    items$ = new BehaviorSubject<Array<Item>>([]);

    constructor(private http: HttpClient) {
        this.fetchItems();
    }

    fetchItems() {
        this.http.get(`//localhost:5000/api/v1/items`).pipe(
            map((data: any) => data.data),
            tap((data: any) => {
                data.forEach((item: any) => {
                    const old_key = '_id';
                    const new_key = 'id';

                    item[new_key] = item[old_key];
                    delete item[old_key];

                    if (item.category == "Men") {
                        item.category = Category.Men;
                    }

                    if (item.category == "Women") {
                        item.category = Category.Women;
                    }

                    item.sizes.forEach((size: any) => {
                        switch (size.stockStatus) {
                            case 'InStock':
                                size.stockStatus = StockStatus.InStock;
                                break;
                            case 'JustAFewLeft':
                                size.stockStatus = StockStatus.JustAFewLeft;
                                break;
                            case 'OutOfStock':
                                size.stockStatus = StockStatus.OutOfStock;
                                break;
                            default:
                                size.stockStatus = StockStatus.OutOfStock;
                                break;
                        }
                    });
                });
            })
        ).subscribe((data: any) => this.items$.next(data));
    }

    getItem(id: string): Item {
        return this.items$.getValue().filter(el => el.id == id)[0];
    }

    getDiscount(promotionsForItem: Promotion[], item: Item) {
        const discountPromotion = promotionsForItem.filter(el => el.promotionType == PromotionType.Discount)[0];

        return discountPromotion?.itemsInPromotion.filter(el => el.itemId == item.id)[0];
    }

    getRealPrice(item: Item, discount: PromotedItem | null) {
        if (discount) {
            return item.price * discount.priceModifier;
        }

        return item.price;
    }
}