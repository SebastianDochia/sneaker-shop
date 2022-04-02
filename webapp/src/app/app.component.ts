import {
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Subject } from 'rxjs';
import { Promotion } from 'src/models/promotion';
import { PromotionService } from 'src/services/promotion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'webapp';
  activePromotions$ = new Subject<Array<Promotion>>();

  constructor(private _promotionService: PromotionService) { }

  ngOnInit() {
    this.activePromotions$ = this._promotionService.activePromotions$;
  }
}
