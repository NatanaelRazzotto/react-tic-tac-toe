import { MatchStatus } from "../enums/MatchStatus";
import { GameMatch } from "../models/gameMatch";
import { User } from "../models/user";

export type ControlTurn = {
  gameMatch? : GameMatch;
  xIsNext: boolean;

}
