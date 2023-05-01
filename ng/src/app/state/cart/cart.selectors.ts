import { createSelector } from "@ngrx/store";
import { CartState } from "./cart.state";
import { Cost } from "../models/cost";

const selectCartList = (state: CartState) => Array.from(state.items.values());

export const selectCart = createSelector(
  selectCartList,
  (cart) => cart
);

export const selectCartResources = createSelector(
  selectCartList,
  (cart) => {
    const resources = new Map<string, Cost>();

    cart.forEach(cartItem => {
      if (cartItem.item.craftingMaterials === undefined) return;

      const level = Math.min(cartItem.level, cartItem.item.craftingMaterials.length);

      for (let i = 0; i < level; i++) {
        cartItem.item.craftingMaterials[i].forEach(cost => {
          const name = cost.wikiThing.name;
          const currentQuantity = resources.get(name)?.quantity ?? 0;

          resources.set(name, {
            wikiThing: cost.wikiThing,
            quantity: currentQuantity + cost.quantity,
          });
        });
      }
    });

    return Array.from(resources.values());
  }
);

export const selectCartSize = createSelector(
  selectCartList,
  (cart) => cart.length > 0
    ? cart.map(cartItem => cartItem.quantity).reduce((total, quantity) => total + quantity)
    : 0
);
