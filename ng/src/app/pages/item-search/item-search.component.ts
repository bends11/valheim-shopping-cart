import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectFilteredCraftableItems } from 'src/app/state/app.state';
import { Item } from 'src/app/state/models/item';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent {
  store = inject(Store);
  craftableItems$ = this.store.select(selectFilteredCraftableItems).pipe(
    map(unorderedList => unorderedList.sort(this.sortFunction))
  );

  private get sortFunction(): (a: Item, b: Item) => number {
    return (a: Item, b: Item) => a.name.localeCompare(b.name);
  }

}
