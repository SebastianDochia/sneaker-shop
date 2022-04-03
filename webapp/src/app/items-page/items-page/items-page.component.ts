import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  Subject,
  Subscription,
} from 'rxjs';
import { Category } from 'src/models/category';
import { Item } from 'src/models/item';
import { Promotion } from 'src/models/promotion';
import { ItemsService } from 'src/services/items.service';
import { PromotionService } from 'src/services/promotion.service';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})
export class ItemsPageComponent implements OnInit {
  private routeSub: Subscription | null = null;
  items$ = new Subject<Array<Item>>();
  promotions$ = new Subject<Array<Promotion>>();
  filter: string = "";

  constructor(private _itemsService: ItemsService, private _promotionService: PromotionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.items$ = this._itemsService.items$;
    this.promotions$ = this._promotionService.activePromotions$;
  }

  getFilteredItems(items: Array<Item> | null, promotions: Array<Promotion> | null): Array<Item> {
    if (items) {
      this.routeSub = this.activatedRoute.params.subscribe(params => {
        this.filter = params.id;
      });

      if (this.filter == "all") {
        return items;
      }

      if (this.filter == "men") {
        return items.filter(el => el.category == Category.Men);
      }

      if (this.filter == "women") {
        return items.filter(el => el.category == Category.Women);
      }

      if (promotions) {
        const selectedPromotion = promotions.filter(el => el.id == this.filter)[0];

        let promoteditemsIds = selectedPromotion.itemsInPromotion.map(el => el.itemId);
        return items.filter(item => promoteditemsIds.includes(item.id));
      }
    }

    return [];
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
