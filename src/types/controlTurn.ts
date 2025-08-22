import { TypeMatchWinner } from "../enums/TypeMatchWinner";
import { Player } from "../models/player";

export type ControlTurn = {
  player1: Player;
  player2: Player;
  xIsNext: boolean;
  matchWinner : TypeMatchWinner;
}
