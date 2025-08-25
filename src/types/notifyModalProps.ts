import { NativeSyntheticEvent } from "react-native";
import { ControlTurn } from "./controlTurn";

export type NotifyModalProps = {
  
    title : string;
    mensage : string;
    visible : boolean;
    onClose :  () => void;
};