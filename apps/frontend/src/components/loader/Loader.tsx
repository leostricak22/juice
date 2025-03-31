import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

import containerStyles from "@/assets/styles/container";
import textStyles from "@/assets/styles/text";

interface LoaderProps {
    size?: "small" | "large";
    color?: string;
    message?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = "large", color = "#3498db", message }) => {
    return (
        <View style={containerStyles.screenContainerCenter}>
            <ActivityIndicator size={size} color={color} />
            {message && <Text style={textStyles.text}>{message}</Text>}
        </View>
    );
};

export default Loader;
