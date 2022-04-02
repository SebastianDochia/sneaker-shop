import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Promotion } from 'src/models/promotion';

@Injectable({
    providedIn: 'root',
})
export class PromotionService {
    activePromotions$ = new BehaviorSubject<Array<Promotion>>([
        {
            id: "1",
            promotionName: "Summer Sale",
            promotionEyeCatcher: "Up to 50% off",
            itemsInPromotion: [],
        },
        {
            id: "2",
            promotionName: "Buy one, get one free",
            promotionEyeCatcher: "Two for one",
            itemsInPromotion: [],
        }
    ]);
}