import { createReducer, on } from "@ngrx/store";
import { CartState } from "./cart.state";
import { CartItem } from "./models/cart-item";
import * as cartActions from "./cart.actions";

export const initialState: CartState = {
  items: new Map<string, CartItem>(),
};

export const cartReducer = createReducer(
  initialState,
  on(cartActions.addItem, (state, { item, quantity, level }) => {
    const { items } = state;
    const name = item.name;
    const currentQuantity = items.get(name)?.quantity ?? 0;

    items.set(name, {
      item,
      quantity: currentQuantity + quantity,
      level,
    });

    return {
      ...state,
      items,
    }
  }),
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
    }
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
    }
  }),
  on(cartActions.updateItem, (state, { item, quantity, level }) => {
    const { items } = state;

    items.set(item.name, {
      item,
      quantity,
      level
    });

    return {
      ...state,
      items,
    }
  }),
  on(cartActions.removeItem, (state, { itemName }) => {
    const { items } = state;

    items.delete(itemName);

    return {
      ...state,
      items,
    }
  })
)
