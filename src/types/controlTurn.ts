import { TypeMatchWinner } from "../enums/TypeMatchWinner";
import { User } from "../models/user";

export type ControlTurn = {
  player1: User | undefined;
  player2: User | undefined;
  xIsNext: boolean;
  matchWinner : TypeMatchWinner;
}
