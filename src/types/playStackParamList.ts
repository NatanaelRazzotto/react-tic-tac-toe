import { CellType } from "../enums/CellType";
import { TypeMatchWinner } from "../enums/TypeMatchWinner";
import { ControlTurn } from "./controlTurn";

export type PlayStackParamList = {
  GameInitial: undefined;
  GamePlay: undefined;
  SelectPlayer: { typePlayer: CellType }; // aqui o parâmetro é do tipo enum
};
