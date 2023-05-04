import { Component, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectCartState } from 'src/app/state/app.state';
import { Item } from 'src/app/state/models/item';

@Component({
  selector: 'app-item-list-item',
  templateUrl: './item-list-item.component.html',
  styleUrls: ['./item-list-item.component.css']
})
export class ItemListItemComponent implements OnInit {
  private store = inject(Store);
  @Input('item') item!: Item;

  quantity$!: Observable<number>;

  ngOnInit(): void {
    this.quantity$ = this.store.select(selectCartState).pipe(
      map((cart) => cart.items.get(this.item.name)?.quantity ?? 0)
    );
  }
}
