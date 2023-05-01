import { createAction, props } from "@ngrx/store";
import { Item } from "../models/item";

export const addItem = createAction('[Craftable Items] Add Item to Cart', props<{ item: Item, quantity: number, level: number }>());

export const incrementItemQuantity = createAction('[Craftable Items] Increment Item Quantity', props<{ item: Item }>());

export const decrementItemQuantity = createAction('[Craftable Items] Decrement Item Quantity', props<{ item: Item }>());

export const updateItem = createAction('[Cart] Update Item', props<{ item: Item, quantity: number, level: number }>());

export const removeItem = createAction('[Cart] Remove Item from Cart', props<{ itemName: string }>());
