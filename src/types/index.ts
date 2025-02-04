export type Champion = {
  id: number;
  name: string;
  cost: number;
  traits: string[];
  image: string;
};

export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export type State = {
  droppedItems: string[];
  traits: { [key: string]: number };
};

export type Action =
  | { type: "ADD_ITEM"; payload: Champion }
  | { type: "REMOVE_ITEM"; payload: Champion };
