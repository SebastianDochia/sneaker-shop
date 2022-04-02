import { Item } from './item';

export interface Promotion {
    id: string;
    promotionName: string;
    promotionEyeCatcher: string;
    itemsInPromotion: Item[];
}