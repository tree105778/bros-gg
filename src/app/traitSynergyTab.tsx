"use client";

import { useContext } from "react";
import {
  DroppedChampionContext,
  useChampionAndIndexStore,
} from "./boardWithSelect";

export default function TraitSynergyTab() {
  const {
    state: { traits },
  } = useContext(DroppedChampionContext);
  const resetAllChampionAndIndex = useChampionAndIndexStore(
    (state) => state.resetAllChampionIndex
  );

  return (
    <>
      <div className="flex bg-[#27282e] gap-1 flex-wrap">
        {Object.entries(traits).map(([trait, count]) => (
          <div
            key={trait}
            className="border-[1px] rounded-[4px] border-[#323232] text-white"
          >
            {trait}: {count}
          </div>
        ))}
      </div>
      <button onClick={resetAllChampionAndIndex}>초기화</button>
    </>
  );
}
