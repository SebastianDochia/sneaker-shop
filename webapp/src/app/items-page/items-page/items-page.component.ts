import {
  Component,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';
import { Item } from 'src/models/item';
import { ItemsService } from 'src/services/items.service';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})
export class ItemsPageComponent implements OnInit {
  items$ = new Subject<Array<Item>>();

  constructor(private _itemsService: ItemsService) { }

  ngOnInit(): void {
    this.items$ = this._itemsService.items$;
  }

}
