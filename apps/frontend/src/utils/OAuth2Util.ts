import {Alert, Platform} from "react-native";
import * as WebBrowser from "expo-web-browser";

const GOOGLE_AUTH_URL =  process.env.EXPO_PUBLIC_API_URL + '/oauth2/authorization/google';

export const handleGoogleLogin = async (setError:any) => {
    try {
        if (Platform.OS === 'web') {
            window.location.href = `${GOOGLE_AUTH_URL}?redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}`;
        } else {
            await WebBrowser.openAuthSessionAsync(
                GOOGLE_AUTH_URL,
                'juice://auth/callback'
            );
        }
    } catch (error: any) {
        console.error('Error during authentication:', error);
        setError(error);
    }
};