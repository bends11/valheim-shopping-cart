import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { changeTypeFilter } from 'src/app/state/items/items.actions';
import { SelectableType } from 'src/app/state/models/selectableType';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent {
  private store = inject(Store);

  types: SelectableType[] = inject(MAT_DIALOG_DATA);

  toggle(name: string) {
    this.types = this.types.map(t => ({
      name: t.name,
      selected: t.name === name ? !t.selected : t.selected,
    }));
  }

  apply() {
    this.store.dispatch(changeTypeFilter({ types: this.types }));
  }
}
