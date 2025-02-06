"use client";

import { useDrag, useDrop } from "react-dnd";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  DroppedChampionContext,
  useChampionAndIndexStore,
} from "./boardWithSelect";
import { ADD_ITEM, Champion, REMOVE_ITEM } from "@/types";

export default function DroppableChampionBoard({
  X,
  Y,
}: {
  X: number;
  Y: number;
}) {
  const { championAndIndex, setChampionIndex, removeChampionIndex } =
    useChampionAndIndexStore();
  const [champion, setChampion] = useState<Champion>();
  const { dispatch } = useContext(DroppedChampionContext);

  useEffect(() => {
    if (championAndIndex.has(`${X},${Y}`))
      setChampion(championAndIndex.get(`${X},${Y}`));
    else setChampion(undefined);
  }, [championAndIndex, X, Y]);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "CHAMPION",
      canDrop: () => !champion,
      drop: (item: Champion) => {
        if (!item.star) item.star = 1;
        setChampionIndex(X, Y, item);
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
        star: champion?.star,
        item: champion?.item,
      },
      end: () => {
        if (champion) {
          // setChampion(undefined);
          removeChampionIndex(X, Y);
          dispatch({ type: REMOVE_ITEM, payload: champion });
        }
      },
    }),
    [champion]
  );

  return (
    <>
      {champion !== undefined ? (
        <div
          className="absolute top-0 left-[50%] z-[1]"
          style={{
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex cursor-pointer gap-x-[2px]">
            <div
              className="size-5 rounded-full border bg-white bg-no-repeat bg-center bg-[length:75%]"
              style={{ backgroundImage: 'url("/champion-star-1.jpeg")' }}
            ></div>
          </div>
        </div>
      ) : null}
      <div
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          backgroundColor: "rgb(34, 34, 34)",
          width: "100%",
          height: "100%",
          margin: 0,
          position: "relative",
        }}
      >
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
            position: "relative",
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            overflow: "visible",
          }}
        >
          {champion !== undefined ? (
            <div
              ref={(node) => {
                if (node) {
                  drag(node);
                }
              }}
            >
              <Image src={champion.image} alt={champion.name} fill />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
