import { TypeMatchWinner } from "../enums/TypeMatchWinner";
import { Player } from "../models/player";

export type ControlTurn = {
  player1: Player | undefined;
  player2: Player | undefined;
  xIsNext: boolean;
  matchWinner : TypeMatchWinner;
}
