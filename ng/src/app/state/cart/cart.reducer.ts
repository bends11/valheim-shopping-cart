import { createReducer, on } from "@ngrx/store";
import { CartState } from "./cart.state";
import { CartItem } from "./models/cart-item";
import * as cartActions from "./cart.actions";

export const initialState: CartState = {
  items: new Map<string, CartItem>(),
  decomposedResources: new Set<string>,
};

export const cartReducer = createReducer(
  initialState,
  on(cartActions.incrementItemQuantity, (state, { item }) => {
    const { items } = state;
    const name = item.name;
    const currentItem = items.get(name);

    if (currentItem) {
      items.set(name, {
        ...currentItem,
        quantity: currentItem.quantity + 1,
      });
    }

    return {
      ...state,
      items,
    };
  }),
  on(cartActions.decrementItemQuantity, (state, { item }) => {
    const { items } = state;
    const name = item.name;
    const currentItem = items.get(name);

    if (currentItem) {
      if (currentItem.quantity <= 1) {
        items.delete(name);
      } else {
        items.set(name, {
          ...currentItem,
          quantity: currentItem.quantity - 1,
        });

      }
    }

    return {
      ...state,
      items,
    };
  }),
  on(cartActions.updateItem, (state, { cartItem }) => {
    const { items } = state;

    items.set(cartItem.item.name, cartItem);

    return {
      ...state,
      items,
    };
  }),
  on(cartActions.removeItem, (state, { item }) => {
    const { items } = state;

    items.delete(item.name);

    return {
      ...state,
      items,
    };
  }),
  on(cartActions.decomposeResource, (state, { cost }) => {
    const { decomposedResources } = state;

    decomposedResources.add(cost.wikiThing.name);

    return {
      ...state,
      decomposedResources,
    };
  })
);
