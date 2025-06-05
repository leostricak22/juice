import React from "react";
import {router} from "expo-router";
import ActionButton from "@/src/components/button/ActionButton";

async function openPaymentModal(amount: number) {
    const {url} = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/payment/hosted-checkout-session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            custom_amount: amount.toString(),
        },
    }).then(async (res) => await res.json());

    router.push(url);
}

export default function CheckoutForm({amount, data, setPaymentMethod}: {amount:number, data:any, setPaymentMethod:any}) {
    return (
        <ActionButton text={"Rezerviraj"} color={"black"} onClick={() => openPaymentModal(amount)} />
    )
}