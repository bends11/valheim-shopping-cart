import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../../dialogs/filter-dialog/filter-dialog.component';
import { SelectableType } from 'src/app/state/models/selectableType';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.css']
})
export class FilterButtonComponent {
  private dialog = inject(MatDialog);

  @Input() types?: SelectableType[];

  openFilterDialog() {
    this.dialog.open(FilterDialogComponent, { data: this.types ?? [] });
  }
}
