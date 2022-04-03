import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/models/category';
import { Item } from 'src/models/item';
import { StockStatus } from 'src/models/stockStatus';

@Injectable({
    providedIn: 'root',
})
export class ItemsService {
    items$ = new BehaviorSubject<Array<Item>>([
        {
            id: "1",
            name: "Nike React Infinity Run Flyknit 3",
            price: 200,
            shortDescription: "Men's Road Running Shoes",
            description: "Still our most tested shoe, made to help you stay after those lofty running goals. The Nike React Infinity Run 3 feels soft and stable, providing a smooth ride that will carry you through routes—both long and short. A breathable upper is made to feel contained, yet flexible. We even added more cushioning around the heel and ankle for a supportive sensation. Keep running, we've got you.",
            image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/885ab55d-bc25-4990-9108-5e4deed8b37e/react-infinity-run-flyknit-3-road-running-shoes-Rxz40r.png",
            ratings: [
                {
                    userId: "1",
                    rating: 5,
                },
                {
                    userId: "2",
                    rating: 3,
                }
            ],
            sizes: [
                {
                    size: 34,
                    stockStatus: StockStatus.InStock,
                },
                {
                    size: 33,
                    stockStatus: StockStatus.JustAFewLeft,
                }
            ],
            category: Category.Men,
        },
        {
            id: "2",
            name: "Kyrie Infinity",
            price: 300,
            shortDescription: "Basketball Shoes",
            description: "The faster Kyrie slows down, the quicker he can speed up or change direction. His ability to control his movement keeps defenders guessing—and him in control. The Kyrie Infinity provides a tight custom fit, enhanced responsiveness in the forefoot and traction up the sides, allowing players to accelerate and decelerate on demand and take advantage of the separation they create.",
            image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/b7a0ce9a-79e2-4050-9a60-042077545162/kyrie-infinity-basketball-shoes-kmX2jc.png",
            ratings: [
                {
                    userId: "1",
                    rating: 5,
                },
                {
                    userId: "2",
                    rating: 5,
                },
                {
                    userId: "3",
                    rating: 1,
                }
            ],
            sizes: [
                {
                    size: 32,
                    stockStatus: StockStatus.OutOfStock,
                },
                {
                    size: 33,
                    stockStatus: StockStatus.OutOfStock,
                }
            ],
            category: Category.Women,
        },
        {
            id: "3",
            name: "LeBron 19",
            price: 300,
            shortDescription: "Basketball Shoes",
            description: "LeBron plays less in the paint and more at the point, so it makes sense that he wants to feel a little quicker. His 19th signature gives you the feeling of containment but with a lighter design that's ideal for fast, strong players like LeBron who stretch the court.",
            image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/465ab10b-d24f-4d78-98eb-f94db71fbdbd/lebron-19-basketball-shoes-Tshbtg.png",
            ratings: [
                {
                    userId: "1",
                    rating: 5,
                },
                {
                    userId: "2",
                    rating: 5,
                },
                {
                    userId: "3",
                    rating: 1,
                }
            ],
            sizes: [
                {
                    size: 32,
                    stockStatus: StockStatus.OutOfStock,
                },
                {
                    size: 33,
                    stockStatus: StockStatus.JustAFewLeft,
                }
            ],
            category: Category.Women,
        },
        {
            id: "4",
            name: "Air Jordan 1 Low",
            price: 300,
            shortDescription: "Men's Shoes",
            description: "Inspired by the original that debuted in 1985, the Air Jordan 1 Low offers a clean, classic look that's familiar yet always fresh. With an iconic design that pairs perfectly with any 'fit, these kicks ensure you'll always be on point.",
            image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/i1-81c51f64-45c7-4aef-b1c6-d9799761c71e/air-jordan-1-low-shoes-v2kdOZ.png",
            ratings: [
                {
                    userId: "1",
                    rating: 5,
                },
                {
                    userId: "2",
                    rating: 5,
                },
                {
                    userId: "3",
                    rating: 1,
                }
            ],
            sizes: [
                {
                    size: 32,
                    stockStatus: StockStatus.OutOfStock,
                },
                {
                    size: 33,
                    stockStatus: StockStatus.OutOfStock,
                }
            ],
            category: Category.Men,
        },
        {
            id: "5",
            name: "Nike Air Max 2021",
            price: 300,
            shortDescription: "Men's Shoes",
            description: "We could tell you that our innovative Air system delivers the best sensation you've ever felt. Or say how the honeycombed foam midsole gives you an incredible, super-soft feel. We could tell you a lot of things about these shoes. But what fun is giving away all the surprises? Lace up and ride the next era of Air for yourself. Made from at least 20% recycled materials by weight.",
            image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/f36b4ea7-58b1-41b7-ad3b-be790f01aa45/air-max-2021-shoes-w7ffPL.png",
            ratings: [
                {
                    userId: "1",
                    rating: 5,
                },
                {
                    userId: "2",
                    rating: 5,
                },
                {
                    userId: "3",
                    rating: 1,
                }
            ],
            sizes: [
                {
                    size: 32,
                    stockStatus: StockStatus.OutOfStock,
                },
                {
                    size: 33,
                    stockStatus: StockStatus.OutOfStock,
                }
            ],
            category: Category.Men,
        }
    ]);

    getitem(id: string): Item {
        return this.items$.getValue().filter(el => el.id == id)[0];
    }
}