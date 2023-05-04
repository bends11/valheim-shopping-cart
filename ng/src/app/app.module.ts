import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { itemsReducer } from './state/items/items.reducer';

import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FEATURE_KEY, metaReducers, reducers } from './state/app.state';

// Material
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Components
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemListItemComponent } from './components/item-list/item-list-item/item-list-item.component';
import { ItemFilterComponent } from './components/item-filter/item-filter.component';
import { ItemSearchComponent } from './pages/item-search/item-search.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CartComponent } from './pages/cart/cart.component';
import { ItemQuantityControlComponent } from './components/item-list/item-list-item/item-quantity-control/item-quantity-control.component';
import { CounterComponent } from './components/inputs/counter/counter.component';
import { RemoveItemButtonComponent } from './components/inputs/remove-item-button/remove-item-button.component';
import { ItemDialogComponent } from './components/dialogs/item-dialog/item-dialog.component';
import { DecomposeButtonComponent } from './components/inputs/decompose-button/decompose-button.component';
import { WikiLinkComponent } from './components/wiki-link/wiki-link.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemListItemComponent,
    ItemFilterComponent,
    ItemSearchComponent,
    ToolbarComponent,
    CartComponent,
    ItemQuantityControlComponent,
    CounterComponent,
    RemoveItemButtonComponent,
    ItemDialogComponent,
    DecomposeButtonComponent,
    WikiLinkComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot({ items: itemsReducer }),
    StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers }),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    // Material
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatToolbarModule,
    MatBadgeModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
