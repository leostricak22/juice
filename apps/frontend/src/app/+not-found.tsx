import {View, Text, StyleSheet} from "react-native";

export default function NotFound() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Screen not found</Text>
            <Text style={styles.subtitle}>Error 404</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 36,
        color: 'black',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 24,
        color: 'black',
    },
})