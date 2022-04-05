import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';
import { Promotion } from 'src/models/promotion';
import { PromotionType } from 'src/models/promotionType';

@Injectable({
    providedIn: 'root',
})
export class PromotionService {
    activePromotions$ = new BehaviorSubject<Array<Promotion>>([]);

    constructor(private http: HttpClient) {
        this.fetchPromotions();
    }

    fetchPromotions() {
        this.http.get(`https://my-sneaker-shop.herokuapp.com/api/v1/promotions`).pipe(
            map((data: any) => data.data),
            tap((data: any) => {
                data.forEach((item: any) => {
                    const old_key = '_id';
                    const new_key = 'id';

                    item[new_key] = item[old_key];
                    delete item[old_key];

                    if (item.promotionType == "Discount") {
                        item.promotionType = PromotionType.Discount;
                    }

                    if (item.promotionType == "TwoForOne") {
                        item.promotionType = PromotionType.TwoForOne;
                    }
                });
            })
        ).subscribe((data: any) => this.activePromotions$.next(data));
    }

    getPromotionsForItem(id: string) {
        return this.activePromotions$.getValue().filter(promo => {
            const itemsInPromotion = promo.itemsInPromotion.filter(item => item.itemId == id);

            return itemsInPromotion.length == 0 ? false : true;
        });
    }
}