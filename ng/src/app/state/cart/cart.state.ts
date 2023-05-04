import { CartItem } from "./models/cart-item";

export interface CartState {
  items: Map<string, CartItem>;
  decomposedResources: Set<string>;
}
