import {View, Text, Button, StyleSheet} from "react-native";
import {Link} from "expo-router";

export default function Index() {
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={{fontWeight:"bold"}}>Dobrodošli u aplikaciju Juice</Text>
            <Text>Juice olakšava rezerviranje dvorana za padel, praćenja rezultata, prijava na turnire te mnogo drugih stvari.</Text>
            <Text>Da biste nastavili, molimo Vas da se prijavite</Text>
            <View style={styles.loginButton}>
                <Link href={"/auth/login"} asChild>
                    <Button title={"Login"} />
                </Link>
            </View>
            <Text>Backend url: {process.env.EXPO_PUBLIC_API_URL}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        gap: 10,
        backgroundColor: 'white',
    },
    loginButton: {
        paddingTop: 20,
        width: '100%',
        maxWidth: 400,
    },
})