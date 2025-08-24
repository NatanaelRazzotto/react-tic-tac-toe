import { CellType } from "../enums/CellType";
import { MatchStatus } from "../enums/MatchStatus";
import { ControlTurn } from "./controlTurn";

export type PlayStackParamList = {
  GameInitial: undefined;
  GamePlay: undefined;
  SelectPlayer: { typePlayer: CellType }; // aqui o parâmetro é do tipo enum
};
