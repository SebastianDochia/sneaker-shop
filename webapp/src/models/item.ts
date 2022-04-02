import { Category } from './category';
import { Rating } from './rating';
import { Sizes } from './sizes';

export interface Item {
    id: string;
    name: string;
    price: number;
    shortDescription: string;
    description: string;
    image: string;
    ratings: Rating[];
    sizes: Sizes[];
    category: Category;
}