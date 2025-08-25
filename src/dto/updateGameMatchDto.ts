import { MatchStatus } from "../enums/MatchStatus";
import { User } from "../models/user";

export type UpdateGameMatchDto = {

  firstPlayerId: string;

  secondPlayerId: string;
  
  gameMatchId: string;

  statusWinner: MatchStatus;

};