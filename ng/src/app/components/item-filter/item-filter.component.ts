import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeFilter } from 'src/app/state/items/items.actions';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.css']
})
export class ItemFilterComponent {
  private store = inject(Store);
  filter = '';

  onFilterChange() {
    this.store.dispatch(changeFilter({ filter: this.filter }));
  }
}
