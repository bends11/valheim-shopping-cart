import { Item } from "../models/item";

export interface ItemsState {
  items: Item[];
  success: boolean;
  fetching: boolean;
}
