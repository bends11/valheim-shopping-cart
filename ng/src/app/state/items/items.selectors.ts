import { createSelector } from "@ngrx/store";
import { ItemsState } from "./items.state";

export const selectItemsState = (state: ItemsState) => state;

export const selectItems = createSelector(
  selectItemsState,
  (state: ItemsState) => state.items
);
