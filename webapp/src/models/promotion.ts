import { PromotedItem } from './promotedItem';
import { PromotionType } from './promotionType';

export interface Promotion {
    id: string;
    promotionName: string;
    promotionEyeCatcher: string;
    itemsInPromotion: PromotedItem[];
    promotionType: PromotionType;
}