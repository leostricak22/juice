import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (newValue: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    return (
        <Pressable style={styles.container} onPress={() => onChange(!checked)}>
            <View style={[styles.checkbox, checked && styles.checked]}>
                {checked && <View style={styles.innerCheck} />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checked: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    innerCheck: {
        width: 12,
        height: 12,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
    },
});

export default Checkbox;
