import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeItem } from 'src/app/state/cart/cart.actions';
import { Item } from 'src/app/state/models/item';

@Component({
  selector: 'app-remove-item-button',
  templateUrl: './remove-item-button.component.html',
  styleUrls: ['./remove-item-button.component.css']
})
export class RemoveItemButtonComponent {
  private store = inject(Store);
  @Input() item?: Item;

  removeItemFromCart() {
    if (this.item === undefined) return
    this.store.dispatch(removeItem({ itemName: this.item.name }));
  }
}
