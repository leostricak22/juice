import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
    },
    inputErrorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
        textAlign: "left",
    },
    inputWrapper: {
        backgroundColor: "white",
        position: "relative",
        width: "100%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 35,
        height: 45,
    },
    inputWrapperWithIcon: {
        backgroundColor: "white",
        position: "relative",
        width: "100%",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 35,
        flexDirection: "row",
        height: 45,
    },
    inputIcon: {
        left: 15,
        top: 13,
        zIndex: 1,
        marginRight: 10
    },
    inputField: {
        height: "100%",
        width: "100%",
        paddingRight: 40,
        fontSize: 14,
        fontFamily: "Roboto",
        paddingLeft: 15,
    },
    iconContainer: {
        position: "absolute",
        right: 15,
        top: 15,
    },
    inputWrapperError: {
        borderColor: "red",
    },
    inputWrapperFocused: {
        backgroundColor: "#f4f4f4",
    },
});

export default styles;