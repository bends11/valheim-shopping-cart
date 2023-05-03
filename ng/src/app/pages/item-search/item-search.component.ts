import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent {
  store = inject(Store);
}
