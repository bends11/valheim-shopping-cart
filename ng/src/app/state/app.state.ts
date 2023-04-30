import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from "@ngrx/store";
import { ItemsState } from "./items/items.state";
import { itemsReducer } from "./items/items.reducer";
import * as itemsSelectors from './items/items.selectors'

export const FEATURE_KEY = 'shared-items';

export interface AppState {
  itemsState: ItemsState;
}

export const reducers: ActionReducerMap<AppState> = {
  itemsState: itemsReducer,
}

export const metaReducers: MetaReducer<AppState>[] = [];

export const selectSharedItemsState = createFeatureSelector<AppState>(FEATURE_KEY);

export const selectItemsState = createSelector(
  selectSharedItemsState,
  (sharedItemsFeatureState) => sharedItemsFeatureState.itemsState,
);

export const selectFilteredCraftableItems = createSelector(
  selectItemsState,
  itemsSelectors.selectFilteredCraftableItems,
);
