import { MatchStatus } from "../enums/MatchStatus";
import { User } from "./user";

export type UpdateGameMatchDto = {

  firstPlayerId: string;

  secondPlayerId: string;
  
  gameMatchId: string;

  statusWinner: MatchStatus;

};