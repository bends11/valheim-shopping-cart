import { createSelector } from "@ngrx/store";
import { ItemsState } from "./items.state";

const selectCraftableItems = (state: ItemsState) => Array.from(state.items.values()).filter(item => !!item.craftingMaterials);

export const selectFilter = (state: ItemsState) => state.filter;

const selectItemsMap = (state: ItemsState) => state.items;

const selectTypes = (state: ItemsState) => Array.from(state.filter.types);

export const selectFilteredCraftableItems = createSelector(
  selectCraftableItems,
  selectFilter,
  (craftableItems, filter) => {
    let filteredItems = craftableItems;

    if (filter.name.length > 0) filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(filter.name?.toLowerCase()));

    const selectedTypes = new Set<string>(filter.types.filter(t => t.selected).map(t => t.name));

    if (selectedTypes.size > 0) filteredItems = filteredItems.filter(item => selectedTypes.has(item.type));

    return filteredItems;
  }
);

export const selectItems = createSelector(
  selectItemsMap,
  (items) => items,
);

export const selectOrderedTypes = createSelector(
  selectTypes,
  (types) => types.sort((a, b) => a.name.localeCompare(b.name)),
);
