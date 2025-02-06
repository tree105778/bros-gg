"use client";

import DroppableChampionBoard from "./droppableChampionBoard";
import styles from "./main.module.css";

export default function BoardBuilder() {
  return (
    <div className="bg-[#4b5563]">
      <div className={styles.boardContainer}>
        {Array.from({ length: 28 }).map((_, idx) => (
          <div
            key={idx}
            className={`${styles.hexagonWrapper} ${
              Math.floor(idx / 7) % 2 === 1 ? styles.offset : ""
            }`}
          >
            {/* <div className={styles.hexagon}> */}
            <DroppableChampionBoard X={Math.floor(idx / 7)} Y={idx % 7} />
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
