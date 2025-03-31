import {Stack, usePathname, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import * as Font from "expo-font";
import Loader from "@/src/components/loader/Loader";

export default function RootLayout() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                "Tektur": require("@/assets/fonts/Tektur-Regular.ttf"),
                "Tektur-Bold": require("@/assets/fonts/Tektur-Bold.ttf"),
            });
            setFontsLoaded(true);
        }

        loadFonts().then(r => r);
    }, []);

    if (!fontsLoaded && pathname !== "/") {
        return <Loader />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
        </Stack>
    )
}