import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Item } from 'src/models/item';
import { ItemsService } from 'src/services/items.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {
  private routeSub: Subscription | null = null;
  item: Item | null = null;
  itemId: string = "";

  constructor(private activatedRoute: ActivatedRoute, private _itemsService: ItemsService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.itemId = params.id;
    });

    this.item = this._itemsService.getitem(this.itemId);
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
