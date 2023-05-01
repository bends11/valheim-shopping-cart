import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addItem, decrementItemQuantity, incrementItemQuantity } from 'src/app/state/cart/cart.actions';
import { Item } from 'src/app/state/models/item';

@Component({
  selector: 'app-item-quantity-control',
  templateUrl: './item-quantity-control.component.html',
  styleUrls: ['./item-quantity-control.component.css']
})
export class ItemQuantityControlComponent {
  store = inject(Store);
  @Input('item') item!: Item;
  @Input('quantity') quantity!: number;

  addOneItemToCart() {
    if (this.quantity === 0) this.store.dispatch(addItem({ item: this.item, quantity: 1, level: 1 }));
    else this.store.dispatch(incrementItemQuantity({ item: this.item }));
  }

  decrementQuantity() {
    this.store.dispatch(decrementItemQuantity({ item: this.item }));
  }
}
