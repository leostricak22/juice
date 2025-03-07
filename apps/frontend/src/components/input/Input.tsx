import {StyleSheet, TextInput} from "react-native";
import React from "react";
import InputProps from "@/src/types/InputProps";

const Input: React.FC<InputProps> = ({ placeholder, value, onInputChange }) => {
    return (
        <TextInput placeholder={placeholder} value={value} style={styles.input} onChange={onInputChange} />
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        width: "100%"
    },
});

export default Input;