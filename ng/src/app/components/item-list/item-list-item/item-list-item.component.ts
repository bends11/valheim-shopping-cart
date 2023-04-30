import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addItem } from 'src/app/state/cart/cart.actions';
import { Item } from 'src/app/state/models/item';

@Component({
  selector: 'app-item-list-item',
  templateUrl: './item-list-item.component.html',
  styleUrls: ['./item-list-item.component.css']
})
export class ItemListItemComponent {
  store = inject(Store);
  @Input('item') item!: Item;

  addItemToCart() {
    this.store.dispatch(addItem({ item: this.item, quantity: 1, level: 1 }));
    console.log('test')
  }
}
