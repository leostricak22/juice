import { TextInput, View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import InputProps from "@/src/types/InputProps";
import inputStyles from "@/assets/styles/input";
import Icon from "@/src/components/icon/Icon";

const Input: React.FC<InputProps> = ({
                                         placeholder,
                                         value,
                                         onInputChange,
                                         error,
                                         type = "text",
                                     }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    return (
        <View style={inputStyles.inputContainer}>
            <View
                style={[
                    inputStyles.inputWrapper,
                    error && inputStyles.inputWrapperError,
                    isFocused && inputStyles.inputWrapperFocused,
                ]}
            >
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    style={inputStyles.inputField}
                    onChange={onInputChange}
                    secureTextEntry={type === "password" && !isPasswordVisible}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {type === "password" && value.trim().length !== 0 && (
                    <TouchableOpacity
                        style={inputStyles.iconContainer}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Icon name={isPasswordVisible ? "hidePassword" : "showPassword"} color={"black"} />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={inputStyles.inputErrorText}>{error}</Text>}
        </View>
    );
};

export default Input;