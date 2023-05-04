import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddItemDialogComponent } from 'src/app/components/item-list/item-list-item/add-item-dialog/add-item-dialog.component';
import { selectCart, selectCartResources } from 'src/app/state/app.state';
import { CartItem } from 'src/app/state/cart/models/cart-item';
import { Item } from 'src/app/state/models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  private store = inject(Store);

  cart$ = this.store.select(selectCart);
  readonly CART_COLUMNS = ['quantity', 'name', 'level', 'actions'];

  resources$ = this.store.select(selectCartResources);
  readonly RESOURCES_COLUMNS = ['quantity', 'name'];

  readonly DISPLAY_CART = 'cart';
  readonly DISPLAY_RESOURCES = 'resources';

  dialog = inject(MatDialog);

  getDisplayLevel(cartItem: CartItem): number | undefined {
    if (cartItem.item.craftingMaterials && cartItem.item.craftingMaterials?.length > 1) return cartItem.level;

    return undefined;
  }

  edit(item: Item) {
    this.dialog.open(AddItemDialogComponent, {
      data: item,
    });
  }
}
