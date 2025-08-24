import { MatchStatus } from "../enums/MatchStatus";
import { User } from "./user";

export type GameMatch = {
  id?: string;
  firstPlayer: User | undefined;
  secondPlayer: User | undefined;
  status : MatchStatus;
  open ?: Date;
  closing ?: Date;
};