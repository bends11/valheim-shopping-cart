import { ItemsState } from "./items.state";
import * as itemsActions from "./items.actions";
import { createReducer, on } from "@ngrx/store";
import { Item } from "../models/item";
import * as itemsJson from "src/assets/items.json";
import * as missingItemsJson from "src/assets/missingItems.json";

export const initialState: ItemsState = {
  items: new Map<string, Item>,
  filter: '',
};

export const itemsReducer = createReducer(
  initialState,
  on(itemsActions.init, (state) => {
    const items = new Map<string, Item>;

    const itemList: Item[] = Array.from(itemsJson) as Item[];
    itemList.push(...Array.from(missingItemsJson) as Item[]);

    itemList.forEach(item => {
      if (item.type === 'Metal'
      && item.craftingMaterials
      && item.craftingMaterials.length === 1
      && item.craftingMaterials[0].length === 1) {
        item.craftingMaterials[0].push({
          wikiThing: {
            name: 'Coal',
            path: '/wiki/Coal',
          },
          quantity: 2,
        });
      } else if (item.name === 'Coal') {
        item.craftingMaterials = [
          [
            {
              wikiThing: {
                name: 'Wood',
                path: '/wiki/Wood',
              },
              quantity: 1,
            }
          ]
        ];
      }
      items.set(item.name, item);
    });

    return {
      ...state,
      items,
    }
  }),
  on(itemsActions.changeFilter, (state, { filter }) => ({
    ...state,
    filter
  })),
);
