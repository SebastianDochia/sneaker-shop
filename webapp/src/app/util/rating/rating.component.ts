import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input()
  rating: number = 0;

  @Input()
  ratingsCount: number = 0;

  constructor() { }
}
