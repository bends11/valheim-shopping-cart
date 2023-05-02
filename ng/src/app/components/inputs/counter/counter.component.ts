import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  incrementFunc = () => {
    if (this.value !== undefined) {
      this.value++;
      this.onChange();
    }
  }

  decrementFunc = () => {
    if (this.value !== undefined) {
      this.value--;
      this.onChange();
    }
  }

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() value?: number;
  @Input() increment: () => void = this.incrementFunc;
  @Input() decrement: () => void = this.decrementFunc;
  @Input() min?: number;
  @Input() max?: number;
  @Input() allowTyping: boolean = false;

  onChange() {
    this.valueChange.emit(this.value);
  }

}
