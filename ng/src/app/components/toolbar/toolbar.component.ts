import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartSize } from 'src/app/state/app.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  private store = inject(Store);
  cartSize$ = this.store.select(selectCartSize);
}
