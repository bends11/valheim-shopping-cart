import { createAction, props } from "@ngrx/store";
import { Item } from "../models/item";
import { CartItem } from "./models/cart-item";
import { Cost } from "../models/cost";

export const incrementItemQuantity = createAction('[Item Quantity Control] Increment Item Quantity', props<{ item: Item }>());

export const decrementItemQuantity = createAction('[Item Quantity Control] Decrement Item Quantity', props<{ item: Item }>());

export const updateItem = createAction('[Item Dialog] Update Item', props<{ cartItem: CartItem }>());

export const removeItem = createAction('[Remove Item Button] Remove Item from Cart', props<{ item: Item }>());

export const decomposeResource = createAction('[Cart Page] Decompose Resource', props<{ cost: Cost }>());
