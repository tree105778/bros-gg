"use client";

import { useDrag, useDrop } from "react-dnd";
import { useContext, useState } from "react";
import Image from "next/image";
import { DroppedChampionContext } from "./boardWithSelect";
import { ADD_ITEM, Champion, REMOVE_ITEM } from "@/types";

export default function DroppableChampionBoard() {
  const [champion, setChampion] = useState<Champion>();
  const { dispatch } = useContext(DroppedChampionContext);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "CHAMPION",
      canDrop: () => !champion,
      drop: (item: Champion) => {
        setChampion(item);
        dispatch({ type: ADD_ITEM, payload: item });
      },
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
    }),
    [champion]
  );

  const [, drag] = useDrag<Champion>(
    () => ({
      type: "CHAMPION",
      item: {
        id: champion?.id || 0,
        name: champion?.name || "",
        cost: champion?.cost || 0,
        traits: champion?.traits || [],
        image: champion?.image || "",
      },
      end: () => {
        if (champion) {
          setChampion(undefined);
          dispatch({ type: REMOVE_ITEM, payload: champion });
        }
      },
    }),
    [champion]
  );

  return (
    <div
      ref={(node) => {
        if (node) {
          drop(node);
        }
      }}
      style={{
        backgroundColor: isOver
          ? canDrop
            ? "lightgreen"
            : "transparent"
          : "transparent",
        width: "100%",
        height: "100%",
      }}
    >
      {champion !== undefined ? (
        <div
          ref={(node) => {
            if (node) {
              drag(node);
            }
          }}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          <Image src={champion.image} alt={champion.name} fill />
        </div>
      ) : null}
    </div>
  );
}
