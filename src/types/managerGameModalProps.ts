import { NativeSyntheticEvent } from "react-native";
import { ControlTurn } from "./controlTurn";

export type ManagerGameModalProps = {
    controlTurn: ControlTurn;
    visible : boolean;
    onClose :  () => void;//(event: NativeSyntheticEvent<boolean>) => void;
};