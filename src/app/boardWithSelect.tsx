"use client";

import { DndProvider } from "react-dnd";
import BoardBuilder from "./boardBuilder";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createContext, Dispatch, useReducer } from "react";
import TraitSynergyTab from "./traitSynergyTab";
import SelectBoard from "./selectBoard";
import { Action, State } from "@/types";
import { initialState, reducer } from "./droppableChampionContext";

export const DroppedChampionContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export default function BoardWithSelect() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DndProvider backend={HTML5Backend}>
      <DroppedChampionContext value={{ state, dispatch }}>
        <TraitSynergyTab />
        <BoardBuilder />
        <nav className="flex gap-[4px] m-2">
          <div className="flex-1 border-[#909090] rounded text-center border-2">
            아이템 조합표
          </div>
          <div className="flex-1 border-[#909090] rounded text-center border-2">
            증강체 선택
          </div>
        </nav>
        <SelectBoard />
      </DroppedChampionContext>
    </DndProvider>
  );
}
