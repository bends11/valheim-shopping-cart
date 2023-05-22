import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeNameFilter } from 'src/app/state/items/items.actions';
import { selectOrderedTypes } from 'src/app/state/app.state';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.css'],
})
export class ItemFilterComponent {
  private store = inject(Store);
  filter = '';

  types$ = this.store.select(selectOrderedTypes);

  onFilterChange() {
    this.store.dispatch(changeNameFilter({ name: this.filter }));
  }
}
