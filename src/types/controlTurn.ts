import { Player } from "./player";

export type ControlTurn = {
  player1: Player;
  player2: Player;
  xIsNext: boolean;
}
