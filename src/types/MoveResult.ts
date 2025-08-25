import { CellType } from "../enums/CellType";
import { Cell } from "./Cell";

export type MoveResult = {
  newBoard: Cell[][];
  nextPlayer: boolean;
  winner: CellType | null;
  isDraw: boolean;
};
