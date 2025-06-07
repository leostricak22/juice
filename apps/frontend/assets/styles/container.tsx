import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
        minHeight: '100%',
        backgroundColor: "white",
        width: '100%',
    },
    screenContainerCenter: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    screenContainerContentCenter: {
        flex: 1,
        width: "100%",
        maxWidth: 600,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 10,
    },
    screenContainerContent: {
        flex: 1,
        width: "100%",
        maxWidth: 600,
        gap: 10,
        padding: 10,
    },
});

export default styles;