import { CellType } from "../enums/CellType";

export type Cell = {

  typePlay: CellType;  //'X' | 'O' | null;   // quem marcou a casa
  playerId ?: string;           // quem marcou a casa
  timestamp?: number;          // hora da jogada (opcional)
  isWinning?: boolean;         // se faz parte da linha vencedora
};