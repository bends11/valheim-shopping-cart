import { createSelector } from "@ngrx/store";
import { CartState } from "./cart.state";

const selectCartList = (state: CartState) => Array.from(state.items.values());

export const selectCart = createSelector(
  selectCartList,
  (cart) => cart
);

export const selectCartSize = createSelector(
  selectCartList,
  (cart) => cart.length > 0
    ? cart.map(cartItem => cartItem.quantity).reduce((total, quantity) => total + quantity)
    : 0
);
