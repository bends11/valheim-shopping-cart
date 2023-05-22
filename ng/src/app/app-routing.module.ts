import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemSearchComponent } from './pages/item-search/item-search.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full'},
  { path: 'search', component: ItemSearchComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
