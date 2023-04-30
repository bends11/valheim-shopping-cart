import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { itemsReducer } from './state/items/items.reducer';
import { ItemsEffects } from './state/items/items.effects';

import { HttpClientModule } from '@angular/common/http';
import { ItemsService } from './services/items.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FEATURE_KEY, metaReducers, reducers } from './state/app.state';

// Material
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Components
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemListItemComponent } from './components/item-list/item-list-item/item-list-item.component';
import { cartReducer } from './state/cart/cart.reducer';
import { ItemFilterComponent } from './components/item-filter/item-filter.component';
import { ItemSearchComponent } from './item-search/item-search.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemListItemComponent,
    ItemFilterComponent,
    ItemSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ items: itemsReducer, cart: cartReducer }),
    StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers }),
    EffectsModule.forRoot([ItemsEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    // Material
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
