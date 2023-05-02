import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  @Input('value') value!: number;
  @Input('increment') increment!: () => void;
  @Input('decrement') decrement!: () => void;
  @Input('min') min?: number;
  @Input('max') max?: number;

}
