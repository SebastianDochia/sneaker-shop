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
import { ItemsService } from 'src/services/items.service';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})
export class ItemsPageComponent implements OnInit {
  private routeSub: Subscription | null = null;
  items$ = new Subject<Array<Item>>();
  filter: string = "";

  constructor(private _itemsService: ItemsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.items$ = this._itemsService.items$;
  }

  getFilteredItems(items: Array<Item> | null): Array<Item> {
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

      
    }

    return [];
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
