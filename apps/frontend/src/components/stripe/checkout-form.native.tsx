import {initPaymentSheet, useStripe} from "@stripe/stripe-react-native";
import React, {useEffect} from "react";
import {Alert, Button} from "react-native";
import * as Linking from "expo-linking";
import ActionButton from "@/src/components/button/ActionButton";
import {useRouter} from "expo-router";
import {useUserData} from "@/src/context/UserContext";
import dataFetch from "@/src/utils/DataFetch";
import Reservation from "@/src/models/entity/Reservation";
import MessageResponse from "@/src/models/dto/MessageResponse";
import ErrorResponse from "@/src/models/dto/ErrorResponse";
import {isResponseError} from "@/src/utils/Validation";

async function fetchPaymentSheetParams(amount: number, data: any, userData: any) {
    console.log("payment intent")
    console.log(data)
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
                    terrainAndDate: {
                        terrainId: data.terrainAndDate.terrainId,
                        timeFrom: data.terrainAndDate.timeFrom,
                        timeTo: data.terrainAndDate.timeTo,
                        date: data.terrainAndDate.date.getTime()
                    },
                    playerIds: data.players.map((player: any) => player === null ? null : player.id),
                    userId: userData.id,
                }
            }
        )
    }).then(async (res) => await res.json());
}

export default function CheckoutForm({amount, data, setPaymentMethod}: { amount: number, data: any, setPaymentMethod: (method: string) => void }) {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const {userData} = useUserData();

    console.log(data)

    if (!userData) {
        return null
    }

    const initializePaymentSheet = async () => {
        setLoading(true)
        const {paymentIntent, ephemeralKey, customer} = await fetchPaymentSheetParams(amount, data, userData);
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
            console.log(error.message)
            Alert.alert(`Error: ${error.message}`);
        } else {
            let response: Reservation | MessageResponse | ErrorResponse;
            setPaymentMethod(null)

            try {
                response = await dataFetch(`${process.env.EXPO_PUBLIC_API_URL}/api/reservation/last-user-reservation`, "GET");
            } catch (e) {
                Alert.alert("Error", "An error occurred while fetching the last reservation.");
                console.error(e);
            }


            if (isResponseError(response)) {
                Alert.alert("Error", "An error occurred while fetching the last reservation.");
                return;
            }

            const reservation = response as Reservation;
            router.push("/reservation/view/" + reservation.id);
        }
    }

    const handlePayment = async () => {
        await openPaymentSheet();
    }

    useEffect(() => {
        console.log(1231231232113)
        console.log(data)
        const initializePaymentSheetOnRender = async () => {
            await initializePaymentSheet();
        }

        initializePaymentSheetOnRender().then(r => r);
    }, []);

    if (loading) {
        return <ActionButton text={"Učitavanje..."} color={"black"} disabled={true}/>
    }

    return (
        <ActionButton text={"Rezerviraj"} color={"black"} onClick={handlePayment}/>
    )
}