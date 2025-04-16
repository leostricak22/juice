
// StripeCheckoutScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import {CardFieldInput, useStripe} from '@stripe/stripe-react-native';
import { CardField } from '@stripe/stripe-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StripeCheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet, confirmPayment } = useStripe();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [amount, setAmount] = useState('100.00'); // Default amount in your currency

    // Sample product data - in a real app this would come from your product database
    const cartItems = [
        { id: 1, name: 'Premium Subscription', price: '80.00' },
        { id: 2, name: 'Shipping', price: '20.00' },
    ];

    // This calls your Spring Boot backend to create a payment intent
    const fetchPaymentIntentFromBackend = async () => {
        try {
            const response = await fetch('http://192.168.113.107:5000/api/payment/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await AsyncStorage.getItem("token")
                    // Add any authorization headers if needed
                    // 'Authorization': 'Bearer YOUR_AUTH_TOKEN'
                },
                body: JSON.stringify({
                    amount: parseFloat(amount) * 100, // Convert to cents for Stripe
                    currency: 'usd', // or your preferred currency
                    customer: {
                        name: name,
                        email: email
                    },
                    // Add any additional metadata needed
                    metadata: {
                        address: address,
                        city: city,
                        postalCode: zip,
                        country: country
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw error;
        }
    };

    // Initialize the Payment Sheet
    const initializePaymentSheet = async () => {
        try {
            setLoading(true);

            // Get payment intent details from your backend
            const paymentIntentData = await fetchPaymentIntentFromBackend();

            const { error } = await initPaymentSheet({
                paymentIntentClientSecret: paymentIntentData.clientSecret,
                merchantDisplayName: 'Your App Name',
                // Only use the data your backend provides
                customerId: paymentIntentData.customerId,
                customerEphemeralKeySecret: paymentIntentData.ephemeralKey,
                defaultBillingDetails: {
                    name: name,
                    email: email,
                },
                allowsDelayedPaymentMethods: true,
            });

            if (error) {
                Alert.alert('Error', error.message);
            }

            return !error;
        } catch (error) {
            Alert.alert('Error', 'Failed to initialize payment. Please try again.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Handle payment using the Payment Sheet
    const handlePaymentSheet = async () => {
        // First initialize the payment sheet
        const isInitialized = await initializePaymentSheet();

        if (!isInitialized) return;

        setLoading(true);
        try {
            const { error } = await presentPaymentSheet();

            if (error) {
                Alert.alert('Payment failed', error.message);
            } else {
                Alert.alert('Success', 'Your payment was successful!');
                // Handle success case - clear cart, navigate to confirmation screen, etc.
            }
        } catch (error) {
            Alert.alert('Error', 'Payment processing failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle direct card payment
    const handleCardPayment = async () => {
        console.log(cardDetails)
        // @ts-ignore
        if (!cardDetails?.complete) {
            Alert.alert('Error', 'Please enter complete card information');
            return;
        }

        if (!email || !name) {
            Alert.alert('Error', 'Please fill in your name and email');
            return;
        }

        setLoading(true);
        try {
            // First create a payment intent on your backend
            const paymentIntentData = await fetchPaymentIntentFromBackend();

            // Use the returned client secret to confirm payment
            const { paymentIntent, error } = await confirmPayment(
                paymentIntentData.clientSecret,
                {
                    paymentMethodType: 'Card',
                    paymentMethodData: {
                        billingDetails: {
                            name,
                            email,
                            address: {
                                city,
                                country,
                                postalCode: zip,
                                line1: address,
                            }
                        },
                    },
                }
            );

            if (error) {
                Alert.alert('Payment failed', error.message);
            } else if (paymentIntent) {
                Alert.alert('Success', 'Your payment was successful!');
                // Handle post-payment success
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to process payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (paymentMethod === 'card') {
            await handleCardPayment();
        } else {
            await handlePaymentSheet();
        }
    };

    const validateForm = () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter your name');
            return false;
        }
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email');
            return false;
        }
        if (!address.trim() || !city.trim() || !zip.trim() || !country.trim()) {
            Alert.alert('Error', 'Please complete your shipping address');
            return false;
        }
        return true;
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Checkout</Text>

            {/* Order Summary */}
            <View style={styles.orderSummary}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
                {cartItems.map(item => (
                    <View key={item.id} style={styles.itemRow}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>${item.price}</Text>
                    </View>
                ))}
                <View style={styles.totalRow}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalAmount}>${amount}</Text>
                </View>
            </View>

            {/* Customer Information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Customer Information</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            {/* Shipping Information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Shipping Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={city}
                    onChangeText={setCity}
                />
                <View style={styles.row}>
                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder="Postal Code"
                        value={zip}
                        onChangeText={setZip}
                    />
                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder="Country"
                        value={country}
                        onChangeText={setCountry}
                    />
                </View>
            </View>

            {/* Payment Method */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <View style={styles.paymentOptions}>
                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            paymentMethod === 'card' && styles.selectedPaymentOption,
                        ]}
                        onPress={() => setPaymentMethod('card')}
                    >
                        <Text style={styles.paymentOptionText}>Credit Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            paymentMethod === 'sheet' && styles.selectedPaymentOption,
                        ]}
                        onPress={() => setPaymentMethod('sheet')}
                    >
                        <Text style={styles.paymentOptionText}>Payment Sheet</Text>
                    </TouchableOpacity>
                </View>

                {paymentMethod === 'card' && (
                    <View style={styles.cardSection}>
                        <Text style={styles.label}>Card Information</Text>
                        <CardField
                            postalCodeEnabled={false}
                            cardStyle={styles.cardStyle}
                            style={styles.cardField}
                            onCardChange={(cardDetails:CardFieldInput.Details) => {
                                console.log("test");
                                setCardDetails(cardDetails);
                            }}
                        />
                    </View>
                )}
            </View>

            {/* Checkout Button */}
            <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => {
                    if (validateForm()) {
                        handlePayment();
                    }
                }}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text style={styles.checkoutButtonText}>Pay ${amount}</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    orderSummary: {
        marginBottom: 24,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12,
        backgroundColor: '#fafafa',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    itemName: {
        fontSize: 16,
        color: '#333',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '500',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        marginTop: 8,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0a84ff',
    },
    paymentOptions: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    paymentOption: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 8,
    },
    selectedPaymentOption: {
        borderColor: '#0a84ff',
        backgroundColor: '#e6f2ff',
    },
    paymentOptionText: {
        fontWeight: '500',
    },
    cardSection: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    cardField: {
        width: '100%',
        height: 50,
        marginBottom: 16,
    },
    cardStyle: {
        backgroundColor: '#fafafa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e1e1e1',
    },
    checkoutButton: {
        backgroundColor: '#0a84ff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 24,
    },
    checkoutButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});