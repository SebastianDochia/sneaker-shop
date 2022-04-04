import {
  Component,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';
import { Item } from 'src/models/item';
import { ItemsService } from 'src/services/items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items$ = new Subject<Array<Item>>();

  constructor(private _itemsService: ItemsService) { }

  ngOnInit(): void {
    this.items$ = this._itemsService.items$;
  }

  firstTwoitems(items: Item[]) {
    return [items[0], items[1]];
  }  
}
