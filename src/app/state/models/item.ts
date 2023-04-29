export interface WikiThing {
  name: string;
  path: string;
}

export interface Item extends WikiThing {
  filename: string;
  type?: string;
  internalId?: string;
  weight?: number;
  maxStackSize?: number;
  teleportable?: boolean;
  droppedBy?: WikiThing;
}
