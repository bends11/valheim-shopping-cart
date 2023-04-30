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

      for (let i = 0; i++; i < level) {
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

    return resources;
  }
)
