import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type RadioButtonProps = {
    label: string;
    selected: boolean;
    onPress: () => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ label, selected, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.outerCircle}>
                {selected && <View style={styles.innerCircle} />}
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
    outerCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    innerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4CAF50',
    },
    label: {
        fontSize: 16,
    },
});

export default RadioButton;
