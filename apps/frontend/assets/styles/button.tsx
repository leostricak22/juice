import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        width: "100%",
        height: 45,
        borderWidth: 1
    },
    iconContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 6,
        marginRight: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: 10,
        fontFamily: "Roboto",
        fontWeight: 'bold',
    },
});

export default styles;