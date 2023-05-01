import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCart, selectCartResources } from 'src/app/state/app.state';
import { CartItem } from 'src/app/state/cart/models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  private store = inject(Store);

  cart$ = this.store.select(selectCart);
  readonly cartColumns = ['quantity', 'name', 'level'];

  resources$ = this.store.select(selectCartResources);
  readonly resouresColumns = ['quantity', 'name'];

  getDisplayLevel(cartItem: CartItem): number | undefined {
    if (cartItem.item.craftingMaterials && cartItem.item.craftingMaterials?.length > 1) return cartItem.level;

    return undefined;
  }
}
