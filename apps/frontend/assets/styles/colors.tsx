import { StyleSheet } from "react-native";

const colors = {
    black: "#000000",
    white: "#FFFFFF",
    blue: "#007BFF",
    red: "#FF0000",
    orange: "#f57e20",
    gray: "#808080",
    transparent: "transparent"
};

const colorsHovered: { [key: string]: string } = {
    black: "#6a6a6a",
    transparent: "#aaaaaa",
}

const colorsElements: { [key: string]: string } = {
    black: "#FFFFFF",
    white: "#000000",
    blue: "#FFFFFF",
    red: "#FFFFFF",
    orange: "#000",
    gray: "#000000",
    transparent: "#000000",
};

const colorsBorder: { [key: string]: string } = {
    white: "#000000",
    transparent: "#000"
}

const colorsDisabled: { [key: string]: string } = {
    black: "#6a6a6a",
    white: "#d3d3d3",
    blue: "#d3d3d3",
    red: "#d3d3d3",
    orange: "#d3d3d3",
    gray: "#d3d3d3",
    transparent: "#aaaaaa"
}

const colorStyles = StyleSheet.create(
    Object.fromEntries(
        Object.entries(colors).flatMap(([key, value]) => [
            [key, { color: value }],
            [`${key}Border`, { borderColor: (colorsBorder[key] || value) }],
            [`${key}Hovered`, {
                borderColor: colorsBorder[key] || darkenColor(value, 0.2),
                backgroundColor: colorsHovered[key] || darkenColor(value, 0.2),
            }],
            [`${key}Background`, { backgroundColor: value }],
            [`${key}Element`, { color: (colorsElements[key] || "black") }],
            [`${key}Disabled`, {
                backgroundColor: colorsDisabled[key] || darkenColor(value, 0.2),
                borderColor: colorsDisabled[key] || darkenColor(value, 0.2),
                color: colorsElements[key] || "black",
            }],
        ])
    )
);

function darkenColor(hex: string, factor: number) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.max(0, Math.floor(r * (1 - factor)));
    g = Math.max(0, Math.floor(g * (1 - factor)));
    b = Math.max(0, Math.floor(b * (1 - factor)));

    return `rgb(${r}, ${g}, ${b})`;
}

export default colorStyles;
