"use client";

import { useState } from "react";
import clsx from "clsx";
import ChampionSelectBoard from "./championSelectBoard";

export default function SelectBoard() {
  const [champOrItemState, setChampOrItemState] = useState("champion");

  const switchToggle: (index: string) => void = (index) => {
    setChampOrItemState(index);
  };

  const setClsxButton: (state: string) => string = (state) =>
    clsx(
      "h-[36px] text-xs px-[12px]",
      champOrItemState === state
        ? "text-white bg-[#ca9372] font-[600] border-[1px]"
        : "text-[#ca9372] border-[#ca9372]"
    );
  return (
    <div>
      <nav className="flex gap-1 bg-black">
        <button
          onClick={() => switchToggle("champion")}
          className={setClsxButton("champion")}
        >
          챔피언
        </button>
        <button
          onClick={() => switchToggle("item")}
          className={setClsxButton("item")}
        >
          아이템
        </button>
      </nav>
      {champOrItemState === "champion" ? <ChampionSelectBoard /> : null}
    </div>
  );
}
