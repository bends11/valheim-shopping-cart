import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { init } from './state/items/items.actions';
import { selectItems } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  store = inject(Store);
  title = 'valheim-shopping-cart';
  subscription: Subscription | undefined;
  items$ = this.store.select(selectItems);

  ngOnInit() {
    this.store.dispatch(init());
  }
}
