// components/PaymentScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Button, Alert, ActivityIndicator } from 'react-native';
import {
    initPaymentSheet,
    presentPaymentSheet,
} from '@stripe/stripe-react-native';

export default function PaymentScreen() {
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    // Replace with your backend URL
    const BACKEND_URL = 'http://192.168.113.107:5000/api/payment/create-payment-intent';

    useEffect(() => {
        fetchPaymentIntent();
    }, []);

    const fetchPaymentIntent = async () => {
        setLoading(true);
        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: 1099, currency: "eur", description: "test" }), // 10.99 USD
            });

            console.log(response)
            const data = await response.json();
            console.log("Data: " + data);

            const { clientSecret: secret } = data;
            setClientSecret(secret);

            const { error } = await initPaymentSheet({
                paymentIntentClientSecret: secret,
                merchantDisplayName: 'My Store',
                style: 'automatic',
                // Properly configure Google Pay
                googlePay: {
                    merchantCountryCode: 'HR',
                    testEnv: true, // Set to false in production
                    currencyCode: 'EUR',
                },
                allowsDelayedPaymentMethods: true,
            });

            if (error) {
                Alert.alert('Error initializing PaymentSheet', error.message);
            }
        } catch (err) {
            Alert.alert('Error', 'Unable to fetch payment intent.');
        } finally {
            setLoading(false);
        }
    };

    const openPaymentSheet = async () => {
        if (!clientSecret) return;

        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Payment failed`, error.message);
        } else {
            Alert.alert('Success', 'Your payment was confirmed!');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <Button title="Pay" onPress={openPaymentSheet} disabled={!clientSecret} />
            )}
        </View>
    );
}
