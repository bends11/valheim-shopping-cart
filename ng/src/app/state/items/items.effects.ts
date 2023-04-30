import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, debounceTime, from, map, switchMap, toArray } from "rxjs";
import { ItemsService } from "src/app/services/items.service";
import { getItemsDetailsSuccess, getItemsError, getItemsSuccess, init } from "./items.actions";

@Injectable()
export class ItemsEffects {
  actions$ = inject(Actions);
  itemsService = inject(ItemsService);

  getItems$ = createEffect(() => this.actions$.pipe(
    ofType(init),
    switchMap(_ => this.itemsService.getItems().pipe(
      map(items => getItemsSuccess({ items }))
    ))
  ));

  getItemsDetails = createEffect(() => this.actions$.pipe(
    ofType(getItemsSuccess),
    switchMap(action => this.itemsService.getAllItemDetails(action.items).pipe(
        map(items => getItemsDetailsSuccess( { items })),
      ))
    ));
}
