import {initPaymentSheet, useStripe} from "@stripe/stripe-react-native";
import React, {useEffect} from "react";
import {Alert, Button} from "react-native";
import * as Linking from "expo-linking";
import ActionButton from "@/src/components/button/ActionButton";

async function fetchPaymentSheetParams(amount:number, data: any) {
    console.log( JSON.stringify(
        {
            amount,
            paymentService: "RESERVATION",
            data: {
                hallId: data.hall.id,
                date: data.date,
                time: data.time,
            }
        }))
    return await fetch(process.env.EXPO_PUBLIC_API_URL + "/api/payment/create-payment-intent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                amount,
                paymentService: "RESERVATION",
                data: {
                    hallId: data.hall.id,
                    date: data.date,
                    time: data.time,
                }
            }
        )
    }).then(async (res) => await res.json());
}

export default function CheckoutForm({amount, data}: {amount:number, data: any}) {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [loading, setLoading] = React.useState(false);

    const initializePaymentSheet = async () => {
        setLoading(true)
        const {paymentIntent, ephemeralKey, customer} = await fetchPaymentSheetParams(amount, data);
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
            googlePay: {
                merchantCountryCode: "HR",
                testEnv: true,
                currencyCode: "EUR",
            }
        });

        setLoading(false)

        if (!error) {
            setLoading(false);
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

    const handlePayment = async () => {
        await openPaymentSheet();
    }

    useEffect(() => {
        const initializePaymentSheetOnRender = async () => {
            await initializePaymentSheet();
        }

        initializePaymentSheetOnRender().then(r => r);
    }, []);

    if (loading) {
        return <ActionButton text={"Učitavanje..."} color={"orange"} />
    }

    return (
        <ActionButton text={"Plati"} color={"orange"} onClick={handlePayment} />
    )
}