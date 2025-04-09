import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    hallPickerContainer: {
        width: "100%",
        height: 70,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    hallPickerContainerHovered: {
        backgroundColor: "#f5f5f5",
        cursor: "pointer",
    },
    hallImage: {
        width: 50,
        height: 50,
        borderRadius: 6,
        backgroundColor: "#f0f0f0",
    },
    hallInfoContainer: {
        flex: 1,
        marginLeft: 16,
        justifyContent: "center",
    },
    hallName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 2,
    },
    hallAddress: {
        fontSize: 13,
        color: "#666",
    },
    arrowContainer: {
        paddingLeft: 8,
    },
    arrow: {
        fontSize: 22,
        color: "#999",
    }
});

export default styles;