import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: "black",
        textAlign: "left",
        fontFamily: "Roboto"
    },
    link: {
        color: "#007BFF",
        textDecorationLine: "underline",
        fontFamily: "Roboto"
    },
    heading: {
        fontSize: 46,
        color: "black",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
        marginBottom: 10,
        width: "100%",
        fontFamily: "Roboto-Bold"
    },
    headingMedium: {
        fontSize: 22,
        color: "black",
        width: "100%",
        fontFamily: "Roboto-Bold",
        fontWeight: "bold"
    },
    headingSmall: {
        fontSize: 18,
        color: "black",
        fontFamily: "Roboto-Bold",
        fontWeight: "bold"
    },
    headingSmallNoBold: {
        fontSize: 18,
        color: "black",
        fontFamily: "Roboto-Bold",
    },
    error: {
        fontSize: 12,
        color: "red",
        fontFamily: "Roboto"
    },
    alignLeft: {
        textAlign: "left",
    },
    alignRight: {
        textAlign: "right",
    },
    alignCenter: {
        textAlign: "center",
    },
    uppercase: {
        textTransform: "uppercase",
    },
    bold: {
        fontWeight: "bold",
    },
    italic: {
        fontStyle: "italic",
    }
});

export default styles;