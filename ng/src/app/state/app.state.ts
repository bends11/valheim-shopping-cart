import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from "@ngrx/store";
import { ItemsState } from "./items/items.state";
import { itemsReducer } from "./items/items.reducer";
import * as itemsSelectors from './items/items.selectors';
import { CartState } from "./cart/cart.state";
import { cartReducer } from "./cart/cart.reducer";
import * as cartSelectors from './cart/cart.selectors';

export const FEATURE_KEY = 'shared-state';

export interface AppState {
  itemsState: ItemsState;
  cartState: CartState;
}

export const reducers: ActionReducerMap<AppState> = {
  itemsState: itemsReducer,
  cartState: cartReducer,
}

export const metaReducers: MetaReducer<AppState>[] = [];

export const selectSharedState = createFeatureSelector<AppState>(FEATURE_KEY);

// Items
export const selectItemsState = createSelector(
  selectSharedState,
  (sharedItemsFeatureState) => sharedItemsFeatureState.itemsState,
);

export const selectFilteredCraftableItems = createSelector(
  selectItemsState,
  itemsSelectors.selectFilteredCraftableItems,
);

// Cart
export const selectCartState = createSelector(
  selectSharedState,
  (sharedCartFeatureState) => sharedCartFeatureState.cartState,
);

export const selectCart = createSelector(
  selectCartState,
  cartSelectors.selectCart,
);

export const selectCartResources = createSelector(
  selectCartState,
  cartSelectors.selectCartResources,
)

export const selectCartSize = createSelector(
  selectCartState,
  cartSelectors.selectCartSize,
);
