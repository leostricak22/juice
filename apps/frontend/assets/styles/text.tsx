import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: "black",
        textAlign: "left",
        fontFamily: "Tektur"
    },
    link: {
        color: "#007BFF",
        textDecorationLine: "underline",
        fontFamily: "Tektur"
    },
    heading: {
        fontSize: 46,
        color: "black",
        textAlign: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
        marginBottom: 10,
        width: "100%",
        textTransform: "uppercase",
        fontFamily: "Tektur-Bold"
    },
    error: {
        fontSize: 12,
        color: "red",
        fontFamily: "Tektur"
    }
});

export default styles;