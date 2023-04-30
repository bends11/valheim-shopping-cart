import { Item } from "../models/item";

export interface ItemsState {
  items: Map<string, Item>;
  success: boolean;
  fetching: boolean;
  filter: string;
}
