import { Item } from "../models/item";

export interface ItemsState {
  items: Map<string, Item>;
  filter: string;
}
