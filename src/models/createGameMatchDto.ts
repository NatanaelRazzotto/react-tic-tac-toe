import { MatchStatus } from "../enums/MatchStatus";
import { User } from "./user";

export type CreateGameMatchDto = {
  // id: string;
  firstPlayerId?: string;
  secondPlayerId?: string;
  // status : MatchStatus;
  open : Date;
  // closing : Date;
};