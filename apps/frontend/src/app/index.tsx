import {View, Text, Button, StyleSheet} from "react-native";
import {Link} from "expo-router";

export default function Index() {
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <View style={styles.container}>
            <Link href={"/auth/login"} asChild>
                <Button title={"Login"} />
            </Link>
            <Text>test</Text>
            <Link href={`${process.env.EXPO_PUBLIC_API_URL}/oauth2/authorization/google`} asChild>
                <Button title={"Google login"} />
            </Link>
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