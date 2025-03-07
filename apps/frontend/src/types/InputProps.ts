import {NativeSyntheticEvent, TextInputChangeEventData} from "react-native";

type InputProps = {
    placeholder?: string;
    value: string;
    onInputChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

export default InputProps;