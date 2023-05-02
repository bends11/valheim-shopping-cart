import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addItem } from 'src/app/state/cart/cart.actions';
import { Item } from 'src/app/state/models/item';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent {
  store = inject(Store);
  item: Item = inject(MAT_DIALOG_DATA);
  quantity = 1;
  level = 1;

  addItemToCart() {
    if (this.quantity < 1) return;
    this.store.dispatch(addItem({
      item: this.item,
      quantity: this.quantity,
      level: this.level,
    }));
  }
}
