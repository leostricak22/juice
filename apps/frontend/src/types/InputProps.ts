import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";

type InputProps = {
    placeholder?: string;
    value: string;
    onInputChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    error?: string;
    type?: string;
    icon?: string;
}

export default InputProps;