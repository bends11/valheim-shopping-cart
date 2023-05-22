import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { updateItem } from 'src/app/state/cart/cart.actions';
import { CartItem } from 'src/app/state/cart/models/cart-item';

export interface ItemDialogData {
  cartItem: CartItem;
  updateItemButtonText?: string;
}

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css'],
})
export class ItemDialogComponent implements OnInit {
  private store = inject(Store);
  data: ItemDialogData = inject(MAT_DIALOG_DATA);
  quantity = 1;
  level = 1;

  ngOnInit(): void {
    this.quantity = this.data.cartItem.quantity;
    this.level = this.data.cartItem.level;
  }

  update() {
    if (this.quantity < 1) return;
    this.store.dispatch(updateItem({ cartItem: {
      item: this.data.cartItem.item,
      quantity: this.quantity,
      level: this.level,
    } }));
  }
}
