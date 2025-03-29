import React, { useState } from "react";
import { Text, Pressable, Platform } from "react-native";
import ButtonProps from "@/src/types/ButtonProps";

import buttonStyles from "@/assets/styles/button";
import colorStyles from "@/assets/styles/colors";

const ActionButton: React.FC<ButtonProps> = ({ text, onClick, color = "blue" }) => {
    const [isHovered, setIsHovered] = useState(false);

    const buttonBackgroundStyle = isHovered ? colorStyles[`${color}Hovered`] : colorStyles[`${color}Background`];

    return (
        <Pressable
            style={[buttonStyles.button, buttonBackgroundStyle]}
            onPress={onClick}
            {...(Platform.OS === "web"
                ? {
                    onMouseEnter: () => setIsHovered(true),
                    onMouseLeave: () => setIsHovered(false),
                }
                : {
                    onPressIn: () => setIsHovered(true),
                    onPressOut: () => setIsHovered(false),
                })}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
        >
            <Text style={[buttonStyles.buttonText, colorStyles[`${color}Element`]]}>{text}</Text>
        </Pressable>
    );
};

export default ActionButton;
