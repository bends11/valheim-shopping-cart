import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

// Components
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemListItemComponent } from './components/item-list/item-list-item/item-list-item.component';
import { ItemFilterComponent } from './components/item-filter/item-filter.component';
import { ItemSearchComponent } from './pages/item-search/item-search.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CartComponent } from './pages/cart/cart.component';
import { ItemQuantityControlComponent } from './components/item-list/item-list-item/item-quantity-control/item-quantity-control.component';
import { AddItemDialogComponent } from './components/item-list/item-list-item/add-item-dialog/add-item-dialog.component';

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
    AddItemDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot({ items: itemsReducer }),
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
    MatToolbarModule,
    MatBadgeModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
