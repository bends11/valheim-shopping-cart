import { createAction, props } from "@ngrx/store";
import { Item } from "../models/item";

export const init = createAction('[Startup] Initialize Items');

export const getItemsSuccess = createAction('[Items Effects] Get Items Success', props<{ items: Map<string, Item>}>());

export const getItemsError = createAction('[Items Effects] Get Items Error');

export const getItemsDetailsSuccess = createAction('[Items Effects] Get Item Details Success', props<{ items: Map<string, Item> }>());

export const changeFilter = createAction('[Craftable Items] Change Filter', props<{ filter: string }>());
