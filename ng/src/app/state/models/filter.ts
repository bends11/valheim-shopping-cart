import { SelectableType } from "./selectableType";

export interface Filter {
  name: string;
  types: SelectableType[];
}

export const initialFilter: Filter = {
  name: '',
  types: [],
}
