import { CartItem } from "./models/cart-item";

export interface CartState {
  items: Map<string, CartItem>;
}
