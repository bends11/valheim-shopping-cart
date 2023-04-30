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
