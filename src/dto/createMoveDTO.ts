import { CellType } from "../enums/CellType";
import { MatchStatus } from "../enums/MatchStatus";
import { User } from "../models/user";

export type CreateMoveDTO = {

    associatedMatchId ?: string;
    responsiblePlayerId ?: string;
    positionRow : number;
    positionColumn : number;
    typeOfPlay : CellType;
    //movementTime : Date;
};