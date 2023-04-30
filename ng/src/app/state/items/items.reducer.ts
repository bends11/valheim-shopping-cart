import { ItemsState } from "./items.state";
import * as itemsActions from "./items.actions";
import { createReducer, on } from "@ngrx/store";
import { Item } from "../models/item";

export const initialState: ItemsState = {
  items: new Map<string, Item>,
  success: true,
  fetching: false,
  filter: '',
};

export const itemsReducer = createReducer(
  initialState,
  on(itemsActions.init, (state) => ({
      ...state,
      success: true,
      fetching: true,
  })),
  on(itemsActions.getItemsSuccess, (state, { items }) => ({
    ...state,
    items,
  })),
  on(itemsActions.getItemsDetailsSuccess, (state, { items }) => ({
      ...state,
      items,
      success: true,
      fetching: false,
  })),
  on(itemsActions.getItemsError, (state) => ({
      ...state,
      success: false,
      fetching: false,
  })),
  on(itemsActions.changeFilter, (state, { filter }) => ({
    ...state,
    filter
  })),
);
