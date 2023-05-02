import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { decrementItemQuantity, incrementItemQuantity } from 'src/app/state/cart/cart.actions';
import { Item } from 'src/app/state/models/item';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';

@Component({
  selector: 'app-item-quantity-control',
  templateUrl: './item-quantity-control.component.html',
  styleUrls: ['./item-quantity-control.component.css']
})
export class ItemQuantityControlComponent {
  store = inject(Store);
  @Input('item') item!: Item;
  @Input('quantity') quantity!: number;

  dialog = inject(MatDialog);

  incrementQuantity = () => {
    this.store.dispatch(incrementItemQuantity({ item: this.item }));
  }

  decrementQuantity = () => {
    this.store.dispatch(decrementItemQuantity({ item: this.item }));
  }

  addItemToCart() {
    this.dialog.open(AddItemDialogComponent, {
      data: this.item,
    });
  }

  removeItemFromCart() {

  }
}
