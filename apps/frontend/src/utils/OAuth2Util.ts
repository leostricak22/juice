import {Platform} from "react-native";
import * as WebBrowser from "expo-web-browser";

const GOOGLE_AUTH_URL = process.env.EXPO_PUBLIC_API_URL + '/oauth2/authorization/google';

export const handleGoogleLogin = async (setError: any) => {
    try {
        const isApp = Platform.OS !== 'web';
        const source = isApp ? 'app' : 'web';
        const redirectUri = isApp ? 'juice://auth/callback' : window.location.origin + '/auth/callback';

        const authUrl = `${GOOGLE_AUTH_URL}?redirect_uri=${encodeURIComponent(redirectUri)}&source=${source}`;

        if (Platform.OS === 'web') {
            window.location.href = authUrl;
        } else {
            await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
        }
    } catch (error: any) {
        console.error('Error during authentication:', error);
        setError(error);
    }
};
