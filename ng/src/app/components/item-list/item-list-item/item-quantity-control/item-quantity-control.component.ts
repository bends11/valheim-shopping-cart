import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ItemDialogComponent, ItemDialogData } from 'src/app/components/dialogs/item-dialog/item-dialog.component';
import { decrementItemQuantity, incrementItemQuantity, removeItem } from 'src/app/state/cart/cart.actions';
import { Item } from 'src/app/state/models/item';

@Component({
  selector: 'app-item-quantity-control',
  templateUrl: './item-quantity-control.component.html',
  styleUrls: ['./item-quantity-control.component.css']
})
export class ItemQuantityControlComponent {
  private store = inject(Store);
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
    const data: ItemDialogData = {
      cartItem: {
        item: this.item,
        quantity: 1,
        level: 1,
      },
      updateItemButtonText: 'Add Item',
    }

    this.dialog.open(ItemDialogComponent, { data });
  }
}
