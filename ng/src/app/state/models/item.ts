import { Cost } from "./cost";
import { WikiThing } from "./wikiThing";

export interface Item extends WikiThing {
  craftingMaterials?: Cost[][];
  type?: string;
  internalId?: string;
  weight?: number;
  maxStackSize?: number;
  teleportable?: boolean;
  droppedBy?: WikiThing;
}
