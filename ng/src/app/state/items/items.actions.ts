import { createAction, props } from "@ngrx/store";
import { SelectableType } from "../models/selectableType";

export const init = createAction('[Startup] Initialize Items');

export const changeNameFilter = createAction('[Craftable Items] Change Name Filter', props<{ name: string }>());

export const changeTypeFilter = createAction('[Filter Dialog] Change Type Filter', props<{ types: SelectableType[] }>());
