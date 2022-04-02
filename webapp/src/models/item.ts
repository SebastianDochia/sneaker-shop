import { Category } from './category';
import { StockStatus } from './stockStatus';

export interface Item {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    rating: string;
    size: number;
    stockStatus: StockStatus;
    category: Category;
}