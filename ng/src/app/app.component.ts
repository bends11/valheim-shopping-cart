import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeFilter, init } from './state/items/items.actions';
import { selectFilteredCraftableItems } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  store = inject(Store);
  craftableItems$ = this.store.select(selectFilteredCraftableItems);
  filter = '';

  ngOnInit() {
    this.store.dispatch(init());
  }

  onFilterChange() {
    this.store.dispatch(changeFilter({ filter: this.filter }));
  }
}
