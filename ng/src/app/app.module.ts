import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { itemsReducer } from './state/items/items.reducer';
import { ItemsEffects } from './state/items/items.effects';
import { HttpClientModule } from '@angular/common/http';
import { ItemsService } from './services/items.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FEATURE_KEY, metaReducers, reducers } from './state/app.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ items: itemsReducer }),
    StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers }),
    EffectsModule.forRoot([ItemsEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
