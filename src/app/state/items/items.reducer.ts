import { ItemsState } from "./items.state";
import * as itemsActions from "./items.actions";
import { createReducer, on } from "@ngrx/store";
import { Item } from "../models/item";

export const initialState: ItemsState = {
  items: new Map<string, Item>,
  success: true,
  fetching: false,
  itemList: [],
};

export const itemsReducer = createReducer(
  initialState,
  on(itemsActions.init, (state) => ({
      ...state,
      success: true,
      fetching: true,
    })
  ),
  on(itemsActions.getItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    itemList: Array.from(items.values()),
  })),
  on(itemsActions.getItemsDetailsSuccess, (_, { items }) => ({
      items,
      success: true,
      fetching: false,
      itemList: Array.from(items.values()),
    })
  ),
  on(itemsActions.getItemsError, (state) => ({
      ...state,
      success: false,
      fetching: false,
    })
  ),
);
