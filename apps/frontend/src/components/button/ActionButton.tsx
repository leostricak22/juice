import React, { useState } from "react";
import {Text, Pressable, Platform, View} from "react-native";
import ButtonProps from "@/src/types/ButtonProps";

import buttonStyles from "@/assets/styles/button";
import colorStyles from "@/assets/styles/colors";
import shadowStyles from "@/assets/styles/shadow";
import Icon from "@/src/components/icon/Icon";

const ActionButton: React.FC<ButtonProps> = ({ text, onClick, color = "blue", icon, disabled }) => {
    const [isHovered, setIsHovered] = useState(false);

    const buttonBackgroundStyle = isHovered ? colorStyles[`${color}Hovered`] : colorStyles[`${color}Background`];
    const buttonBorderColor = colorStyles[`${color}Border`];

    return (
        <Pressable
            style={[buttonStyles.button, color !== "transparent" && shadowStyles.smallShadow, buttonBackgroundStyle, !isHovered && buttonBorderColor, disabled && colorStyles[`${color}Disabled`]]}
            onPress={() => {
                if(!disabled) {
                    if (onClick) {
                        onClick()
                    }
                }
            }}
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
            {icon && <Icon name={"google"} />}
            <Text style={[buttonStyles.buttonText, colorStyles[`${color}Element`]]}>{text}</Text>
        </Pressable>
    );
};

export default ActionButton;
