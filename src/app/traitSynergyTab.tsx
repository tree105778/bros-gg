"use client";

import { useContext } from "react";
import { DroppedChampionContext } from "./boardWithSelect";

export default function TraitSynergyTab() {
  const {
    state: { traits },
  } = useContext(DroppedChampionContext);

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
      <button>초기화</button>
    </>
  );
}
