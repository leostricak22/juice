import React from 'react';
import {Text} from 'react-native';
import CheckoutForm from "@/src/components/stripe/checkout-form";

export default function PaymentScreen() {
    return (
        <>
            <Text>Payment test</Text>
            <CheckoutForm amount={150} />
        </>
    );
}
