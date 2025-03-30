import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

interface LoaderProps {
    size?: "small" | "large";
    color?: string;
    message?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = "large", color = "#3498db", message }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    message: {
        marginTop: 10,
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Loader;
