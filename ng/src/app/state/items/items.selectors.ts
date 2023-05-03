import { createSelector } from "@ngrx/store";
import { ItemsState } from "./items.state";

const selectCraftableItems = (state: ItemsState) => Array.from(state.items.values()).filter(item => !!item.craftingMaterials);

const selectFilter = (state: ItemsState) => state.filter;

export const selectFilteredCraftableItems = createSelector(
  selectCraftableItems,
  selectFilter,
  (craftableItems, filter) => craftableItems.filter(item => item.name.toLowerCase().includes(filter.toLowerCase())),
)
