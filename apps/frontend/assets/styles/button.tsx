import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: "100%",
        /* @ts-ignore */
        outlineStyle: "none",
    },
    iconContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 6,
        marginRight: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        marginHorizontal: 10,
        fontFamily: "Tektur",
    },
});

export default styles;