import { Component, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectItemsState } from 'src/app/state/app.state';
import { decomposeResource } from 'src/app/state/cart/cart.actions';
import { Cost } from 'src/app/state/models/cost';

@Component({
  selector: 'app-decompose-button',
  templateUrl: './decompose-button.component.html',
  styleUrls: ['./decompose-button.component.css']
})
export class DecomposeButtonComponent implements OnInit {
  private store = inject(Store);
  @Input() cost?: Cost;

  canDecompose$!: Observable<boolean>;

  ngOnInit(): void {
    this.canDecompose$ =this.store.select(selectItemsState).pipe(
        map(state => {
          if (!this.cost) return false;
          const craftingMaterials = state.items.get(this.cost.wikiThing.name)?.craftingMaterials;

          return !!craftingMaterials && craftingMaterials.length > 0;
        })
      )
  }

  decompose() {
    if (!this.cost) return;
    this.store.dispatch(decomposeResource({ cost: this.cost }));
  }
}
