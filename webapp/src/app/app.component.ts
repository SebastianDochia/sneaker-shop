import { Component } from '@angular/core';

import { Subject } from 'rxjs';
import { Item } from 'src/models/item';
import { Promotion } from 'src/models/promotion';
import { PromotionService } from 'src/services/promotion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'webapp';
  activePromotions$ = new Subject<Array<Promotion>>();
  items$ = new Subject<Array<Item>>();

  constructor(private _promotionService: PromotionService) { }

  ngOnInit() {
    this.activePromotions$ = this._promotionService.activePromotions$;
  }
}
