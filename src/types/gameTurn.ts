import { TypeMatchWinner } from "../enums/TypeMatchWinner";
import { ControlTurn } from "./controlTurn";

export type GameTurnProps = {
  controlTurn: ControlTurn;
  setControlTurn: React.Dispatch<React.SetStateAction<ControlTurn>>;
};
