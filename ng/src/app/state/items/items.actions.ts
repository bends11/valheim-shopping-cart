import { createAction, props } from "@ngrx/store";

export const init = createAction('[Startup] Initialize Items');

export const changeFilter = createAction('[Craftable Items] Change Filter', props<{ filter: string }>());
