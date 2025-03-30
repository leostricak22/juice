import {Stack} from "expo-router";
import {useEffect, useState} from "react";
import * as Font from "expo-font";
import Loader from "@/src/components/loader/Loader";

export default function RootLayout() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                "Boldonse": require("@/assets/fonts/Boldonse-Regular.ttf"),
            });
            setFontsLoaded(true);
        }

        loadFonts().then(r => r);
    }, []);

    if (!fontsLoaded) {
        return <Loader />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
        </Stack>
    )
}