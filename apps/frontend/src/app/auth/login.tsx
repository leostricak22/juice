import React from 'react';
import { Button, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const GOOGLE_AUTH_URL = 'https://cat-allowed-rabbit.ngrok-free.app/oauth2/authorization/google';

const GoogleAuthButton: React.FC = () => {
    const handleLogin = async () => {
        try {
            await WebBrowser.openAuthSessionAsync(GOOGLE_AUTH_URL);
        } catch (error: any) {
            console.error('Error during authentication:', error);
            Alert.alert('Authentication Error', error.message);
        }
    };

    return (
        <Button title="Login with Google" onPress={handleLogin} />
    );
};

export default GoogleAuthButton;
