import {initPaymentSheet, useStripe} from "@stripe/stripe-react-native";
import React from "react";
import {Alert, Button} from "react-native";
import * as Linking from "expo-linking";

async function fetchPaymentSheetParams(amount:number ) {
    return await fetch("https://cat-allowed-rabbit.ngrok-free.app/api/payment/create-payment-intent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount })
    }).then(async (res) => await res.json());
}

export default function CheckoutForm({amount}: {amount:number}) {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [loading, setLoading] = React.useState(false);

    const initializePaymentSheet = async () => {
        const {paymentIntent, ephemeralKey, customer} = await fetchPaymentSheetParams(amount);
        const {error} = await initPaymentSheet({
            merchantDisplayName: "Juice",
            customerId: customer,
            // @ts-ignore
            customerEphemeralKey: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: "Jane Doe",
                email: "jenny.rosen@example.com",
                phone: "888-888-8888",
            },
            returnURL: Linking.createURL("stripe-redirect"),
            applePay: {
                merchantCountryCode: "HR",
            },
        });

        if (!error) {
            setLoading(true);
        }
    }

    const openPaymentSheet = async () => {
        const {error} = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error: ${error.message}`);
        } else {
            Alert.alert("Success", "Your order is confirmed!");
        }
    }

    return (
        <>
            <Button title={"Initiate Payment"} onPress={initializePaymentSheet} />
            <Button title={"Open Payment Sheet"} onPress={openPaymentSheet} />
        </>
    )
}