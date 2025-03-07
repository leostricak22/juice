import React, { useState } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import ButtonProps from "@/src/types/ButtonProps";

const ActionButton: React.FC<ButtonProps> = ({ text, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Pressable
            style={[styles.button, isHovered && styles.buttonHovered]}
            onPress={onClick}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        padding: 10,
        backgroundColor: "#646E68",
        borderRadius: 5,
        alignItems: "center",
    },
    buttonHovered: {
        backgroundColor: "#4E5B51",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ActionButton;
