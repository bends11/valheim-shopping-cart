import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from "@ngrx/store";
import { ItemsState } from "./items/items.state";
import { itemsReducer } from "./items/items.reducer";
import * as itemsSelectors from './items/items.selectors';
import { CartState } from "./cart/cart.state";
import { cartReducer } from "./cart/cart.reducer";
import * as cartSelectors from './cart/cart.selectors';
import { Cost } from "./models/cost";
import { Item } from "./models/item";

export const FEATURE_KEY = 'shared-state';

export interface AppState {
  itemsState: ItemsState;
  cartState: CartState;
}

export const reducers: ActionReducerMap<AppState> = {
  itemsState: itemsReducer,
  cartState: cartReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];

export const selectSharedState = createFeatureSelector<AppState>(FEATURE_KEY);

// Items
export const selectItemsState = createSelector(
  selectSharedState,
  (sharedItemsFeatureState) => sharedItemsFeatureState.itemsState
);

export const selectFilteredCraftableItems = createSelector(
  selectItemsState,
  itemsSelectors.selectFilteredCraftableItems
);

export const selectItem = createSelector(
  selectItemsState,
  itemsSelectors.selectItems
);

export const selectOrderedTypes = createSelector(
  selectItemsState,
  itemsSelectors.selectOrderedTypes
);

export const selectFilter = createSelector(
  selectItemsState,
  itemsSelectors.selectFilter
);

// Cart
export const selectCartState = createSelector(
  selectSharedState,
  (sharedCartFeatureState) => sharedCartFeatureState.cartState
);

export const selectCart = createSelector(
  selectCartState,
  cartSelectors.selectCart
);

export const selectCartSize = createSelector(
  selectCartState,
  cartSelectors.selectCartSize
);


// Full State

export const selectState = createSelector(
  selectSharedState,
  (sharedState) => sharedState
);

export const selectCartResources = createSelector(
  selectState,
  (state) => {
    const resources = new Map<string, Cost>();

    state.cartState.items.forEach(cartItem => {
      if (cartItem.item.craftingMaterials === undefined) return;

      const level = Math.min(cartItem.level, cartItem.item.craftingMaterials.length);

      for (let i = 0; i < level; i++) {
        cartItem.item.craftingMaterials[i].forEach(cost => {
          const decomposedCost = getDecomposedCost(cost, state.cartState.decomposedResources, state.itemsState.items);

          decomposedCost.forEach(c => {
            const name = c.wikiThing.name;
            const currentQuantity = resources.get(name)?.quantity ?? 0;

            resources.set(name, {
              wikiThing: c.wikiThing,
              quantity: currentQuantity + (c.quantity * cartItem.quantity),
            });

          });
        });
      }
    });

    return Array.from(resources.values());
  }
);

function getDecomposedCost(cost: Cost, decomposedResources: Set<string>, items: Map<string, Item>): Cost[] {
  const decomposedCost: Cost[] = [];
  const decomposedCraftingMaterials = items.get(cost.wikiThing.name)?.craftingMaterials;

  if (decomposedResources.has(cost.wikiThing.name) && !!decomposedCraftingMaterials && decomposedCraftingMaterials.length > 0) {
    decomposedCraftingMaterials[0].forEach(costToDecompose => {
      getDecomposedCost(costToDecompose, decomposedResources, items).forEach(c => {
        const newDecomposedCost: Cost = {
          ...c,
          quantity: c.quantity * cost.quantity,
        };
        decomposedCost.push(newDecomposedCost);
      });
    });
  } else {
    decomposedCost.push(cost);
  }

  return decomposedCost;
}
