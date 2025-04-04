import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    dashboardMenuContainer: {
        width: "100%",
        maxWidth: 400,
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 10,
        margin: "auto",
    },
    dashboardMenuItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "white",
        borderWidth: 1,
        width: 190,
        height: 200,
        gap: 5
    },
    dashboardMenuItemHover: {
        backgroundColor: "#f0f0f0"
    },
    dashboardMenuItemImage: {
        width: 120,
        height: 120,
    }
});

export default styles;