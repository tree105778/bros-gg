"use client";

import { Champion } from "@/types";
import Image from "next/image";
import { useDrag } from "react-dnd";

export default function DraggableChampionImage({
  champion,
}: {
  champion: Champion;
}) {
  const { id, name, cost, traits, image } = champion;
  const [, drag] = useDrag<Champion>(() => ({
    type: "CHAMPION",
    item: {
      id,
      name,
      cost,
      traits,
      image,
    },
  }));

  return (
    <>
      <div
        ref={(node) => {
          if (node) {
            drag(node);
          }
        }}
      >
        <Image
          src={champion.image}
          alt={champion.name}
          width={60}
          height={60}
        />
      </div>
    </>
  );
}
