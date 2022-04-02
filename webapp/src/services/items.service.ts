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
            name: "Nike Zoom 22",
            price: 200,
            shortDescription: "LALALALALALA",
            description: "LALALALALALALALALALALALALALALA",
            image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7fb9baf4-e405-4b97-81da-8106d79890a9/air-zoom-structure-24-road-running-shoes-JcGGRT.png",
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
            name: "Nike Zoom Pegasus",
            price: 300,
            shortDescription: "BLALALALALALA",
            description: "BLALALALALALALALALALALALALALALA",
            image: "https://5.imimg.com/data5/PC/UJ/RX/SELLER-31128762/nike-zoom-pegasus-35-turbo-x-500x500.jpg",
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
            name: "Nike Zoom Pegasus",
            price: 300,
            shortDescription: "BLALALALALALA",
            description: "BLALALALALALALALALALALALALALALA",
            image: "https://5.imimg.com/data5/PC/UJ/RX/SELLER-31128762/nike-zoom-pegasus-35-turbo-x-500x500.jpg",
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
            id: "4",
            name: "Nike Zoom Pegasus",
            price: 300,
            shortDescription: "BLALALALALALA",
            description: "BLALALALALALALALALALALALALALALA",
            image: "https://5.imimg.com/data5/PC/UJ/RX/SELLER-31128762/nike-zoom-pegasus-35-turbo-x-500x500.jpg",
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
            id: "5",
            name: "Nike Zoom Pegasus",
            price: 300,
            shortDescription: "BLALALALALALA",
            description: "BLALALALALALALALALALALALALALALA",
            image: "https://5.imimg.com/data5/PC/UJ/RX/SELLER-31128762/nike-zoom-pegasus-35-turbo-x-500x500.jpg",
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
        }
    ]);
}