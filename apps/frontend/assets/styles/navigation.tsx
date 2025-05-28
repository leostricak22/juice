import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    navigationContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 80,
        backgroundColor: "transparent",
    },
    navigationSectionContainer: {
        width: "100%",
        height: "100%",
        borderTopWidth: 2,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 15,
        borderColor: "#d9d9d9",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
    },
    navigationSection: {
        width: "20%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    navigationIcon: {
        padding: 10,
    },
    navigationSelectedIcon: {
        backgroundColor: "#ffde87",
        borderRadius: 15,
    },
    navigationAddButton: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: "#f57e20",
        borderWidth: 2,
        backgroundColor: "white",
    },
    navigationModalContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "red",
    },
    navigationCreateSectionModal: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(217, 217, 217, 0.75)",
        flex: 1,
        justifyContent: "flex-end",
    },
    navigationAddButtonModalButtonsContainer: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingHorizontal: 10,
        gap: 10,
    },
    navigationAddButtonModalContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    navigationAddButtonModal: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: "#f57e20",
        borderWidth: 2,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 24
    },
});

export default styles