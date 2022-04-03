import { Promoteditem } from './promotedItem';
import { PromotionType } from './promotionType';

export interface Promotion {
    id: string;
    promotionName: string;
    promotionEyeCatcher: string;
    itemsInPromotion: Promoteditem[];
    promotionType: PromotionType;
}