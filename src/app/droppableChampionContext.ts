import { Action, ADD_ITEM, REMOVE_ALL_ITEM, REMOVE_ITEM, State } from "@/types";

export const initialState: State = {
  droppedItems: [],
  traits: {},
};

export function reducer(state: State, action: Action): State {
  const { droppedItems, traits } = state;
  switch (action.type) {
    case ADD_ITEM:
      const newTraits = { ...traits };
      if (!droppedItems.includes(action.payload.name)) {
        action.payload.traits.forEach((trait) => {
          newTraits[trait] = (newTraits[trait] || 0) + 1;
        });
      }
      return {
        ...state,
        droppedItems: [...droppedItems, action.payload.name],
        traits: newTraits,
      };
    case REMOVE_ITEM:
      const newDroppedItems = [...droppedItems];
      const newTraitsRemove = { ...traits };
      const lastIndex = newDroppedItems.findLastIndex(
        (item) => action.payload.name === item
      );
      if (lastIndex !== -1) {
        newDroppedItems.splice(lastIndex, 1);
      }
      if (!newDroppedItems.includes(action.payload.name)) {
        action.payload.traits.forEach((trait) => {
          if (newTraitsRemove[trait] > 1) {
            newTraitsRemove[trait] -= 1;
          } else delete newTraitsRemove[trait];
        });
      }
      return {
        ...state,
        droppedItems: newDroppedItems,
        traits: newTraitsRemove,
      };
    case REMOVE_ALL_ITEM:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
