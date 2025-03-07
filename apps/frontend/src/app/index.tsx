import {View, Text, Button, StyleSheet} from "react-native";
import {Link} from "expo-router";

export default function Index() {
    return (
        <View style={styles.container}>
            <Link href={"/auth/login"} asChild>
                <Button title={"Login"} />
            </Link>
            <Text>test</Text>
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
})