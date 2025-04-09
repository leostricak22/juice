import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";

import textStyles from "@/assets/styles/text"

export type ProgressBarProps = {
    step: number;
    maxStep: number;
    setStep?: (step: number) => void;
    color?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ step, maxStep, setStep, color="#0478ca" }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {
                    setStep &&
                    <Pressable onPress={() => {
                        if (step > 1) setStep(step-1)
                    }}>
                        <Text style={[styles.backText, { color }, textStyles.bold]}>&lt; Back</Text>
                    </Pressable>
                }
                <Text style={[styles.stepCount, { color }, textStyles.bold]}>Koraci {step} od {maxStep}</Text>
            </View>
            <View style={styles.barContainer}>
                <View style={[styles.bar, { width: `${(step-1) * (100/(maxStep-1))}%` }, {backgroundColor: color}]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    barContainer: {
        width: '100%',
        height: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 50,
    },
    bar: {
        height: '100%',
        backgroundColor: '#0478ca',
        borderRadius: 50,
    },
    stepCount: {
        alignSelf: 'flex-end',
    },
    backText: {
        alignSelf: 'flex-start',
        userSelect: 'none',
    },
    textContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    }
});

export default ProgressBar;