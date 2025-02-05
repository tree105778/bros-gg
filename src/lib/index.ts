import { Champion } from "@/types";
import { getChoseong } from "./getChoseong";

export const processingChampions = (
  criteria: string,
  champions: Champion[]
) => {
  let sortedChampions = [...champions];
  switch (criteria) {
    case "name":
      sortedChampions = sortedChampions.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    case "price":
      sortedChampions = sortedChampions.sort((a, b) => a.cost - b.cost);
      break;
    default:
      sortedChampions = [...champions];
  }
  return sortedChampions;
};

export const updateProcessedChampions = (
  criteria: string,
  searchText: string,
  data: Champion[]
) => {
  let newChampions = [...data];
  switch (criteria) {
    case "name":
      newChampions = newChampions.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "price":
      newChampions = newChampions.sort((a, b) => a.cost - b.cost);
      break;
    default:
      newChampions = [...data];
  }

  if (searchText !== "") {
    newChampions = newChampions.filter(
      (champ) =>
        champ.name.includes(searchText) ||
        getChoseong(champ.name).includes(searchText)
    );
  }
  return newChampions;
};
