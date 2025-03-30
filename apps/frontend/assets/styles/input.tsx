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
        height: 50,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
    },
    inputField: {
        height: 50,
        padding: 10,
        paddingRight: 40,
        fontSize: 14,
        fontFamily: "Tektur",
        /* @ts-ignore */
        outlineStyle: "none",
        paddingLeft: 10,
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