import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Promotion } from 'src/models/promotion';
import { PromotionType } from 'src/models/promotionType';

@Injectable({
    providedIn: 'root',
})
export class PromotionService {
    activePromotions$ = new BehaviorSubject<Array<Promotion>>([
        {
            id: "1",
            promotionName: "Summer Sale",
            promotionEyeCatcher: "Up to 50% off",
            itemsInPromotion: [
                { 
                    itemId: "1",
                    priceModifier: 0.7,
                },
                {
                    itemId: "2",
                    priceModifier: 0.6,
                }
            ],
            promotionType: PromotionType.Discount,
        },
        {
            id: "2",
            promotionName: "Buy one, get one free",
            promotionEyeCatcher: "Two for one",
            itemsInPromotion: [
                { 
                    itemId: "2",
                    priceModifier: 1,
                },
                {
                    itemId: "3",
                    priceModifier: 1,
                }
            ],
            promotionType: PromotionType.TwoForOne
        }
    ]);
}