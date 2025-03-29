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
        /* @ts-ignore */
        outlineStyle: "none",
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
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.19,
        shadowRadius: 5.62,
        elevation: 6,
    },
});

export default styles;