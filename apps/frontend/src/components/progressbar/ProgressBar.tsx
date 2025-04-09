import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";

export type ProgressBarProps = {
    step: number;
    maxStep: number;
    setStep?: (step: number) => void;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ step, maxStep, setStep }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {
                    setStep &&
                    <Pressable onPress={() => {
                        if (step > 1) setStep(step-1)
                    }}>
                        <Text style={styles.backText}>&lt; Back</Text>
                    </Pressable>
                }
                <Text style={styles.stepCount}>Koraci {step} od {maxStep}</Text>
            </View>
            <View style={styles.barContainer}>
                <View style={[styles.bar, { width: `${(step-1) * (100/(maxStep-1))}%` }]} />
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
        color: '#0478ca',
    },
    backText: {
        alignSelf: 'flex-start',
        color: '#0478ca',
        userSelect: 'none',
    },
    textContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default ProgressBar;