import { Component, Input } from '@angular/core';
import { Item } from 'src/app/state/models/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  @Input('items') items: Item[] | null = null;
}
