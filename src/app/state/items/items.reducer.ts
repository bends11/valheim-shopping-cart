import { ItemsState } from "./items.state";
import * as itemsActions from "./items.actions";
import { createReducer, on } from "@ngrx/store";

export const initialState: ItemsState = {
  items: [],
  success: true,
  fetching: false,
};

export const itemsReducer = createReducer(
  initialState,
  on(itemsActions.init, (state) => ({
      ...state,
      success: true,
      fetching: true,
    })
  ),
  on(itemsActions.getItemsDetailsSuccess, (_, { items }) => ({
      items,
      success: true,
      fetching: false,
    })
  ),
  on(itemsActions.getItemsError, (state) => ({
      ...state,
      success: false,
      fetching: false,
    })
  ),
);
