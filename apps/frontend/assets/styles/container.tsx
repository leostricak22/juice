import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    screenContainerCenter: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff7ef",
    },
    screenContainerContent: {
        flex: 1,
        width: "100%",
        maxWidth: 600,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 10,
    }
});

export default styles;