import React from "react";
import {Alert, Button} from "react-native";
import {router} from "expo-router";

async function openPaymentModal(amount: number) {
    const {url} = await fetch("https://cat-allowed-rabbit.ngrok-free.app/api/payment/hosted-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            custom_amount: amount.toString(),
        },
    }).then(async (res) => {
        var newVar = await res.json();
        console.log(newVar)
        return newVar;
    });

    console.log(url)

    router.push(url);
}

export default function CheckoutForm({amount}: {amount:number}) {
    return (
        <>
            <Button title={"Checkout"} onPress={() => openPaymentModal(1500)} />
        </>
    )
}