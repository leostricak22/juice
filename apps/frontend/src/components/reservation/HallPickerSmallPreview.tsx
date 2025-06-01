import React, { useRef } from "react";
import {
    Text,
    View,
    ImageBackground,
    Animated,
    Pressable,
    StyleSheet,
    Platform,
} from "react-native";
import Hall from "@/src/models/entity/Hall";

const HallPickerSmallPreview: React.FC<{
    hall: Hall;
    onSectionPress: (hall: Hall) => void;
}> = ({ hall, onSectionPress }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const darkenAnim = useRef(new Animated.Value(1)).current;

    const handleHoverIn = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1.05,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(darkenAnim, {
                toValue: 0.7,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleHoverOut = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(darkenAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <Pressable
            onPressIn={handleHoverIn}
            onPressOut={handleHoverOut}
            onPress={() => onSectionPress(hall)}
            onHoverIn={Platform.OS === "web" ? handleHoverIn : undefined}
            onHoverOut={Platform.OS === "web" ? handleHoverOut : undefined}
            style={styles.wrapper}
        >
            <Animated.View
                style={[
                    styles.animatedContainer,
                    {
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <ImageBackground
                    source={require("@/assets/images/no-image.jpg")}
                    resizeMode="cover"
                    style={styles.imageBackground}
                    imageStyle={{ borderRadius: 12 }}
                >
                    <Animated.View
                        style={[
                            styles.overlay,
                            {
                                backgroundColor: darkenAnim.interpolate({
                                    inputRange: [0.7, 1],
                                    outputRange: ["rgba(0,0,0,0.3)", "rgba(0,0,0,0)"],
                                }),
                            },
                        ]}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{hall.name}</Text>
                    </View>
                </ImageBackground>
            </Animated.View>
        </Pressable>
    );
};


export default HallPickerSmallPreview;

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 12,
        overflow: "hidden",
        width: "100%",
        height: 160,
    },
    animatedContainer: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: "flex-end",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 12,
    },
    textContainer: {
        position: "absolute",
        bottom: 10,
        left: 16,
    },
    text: {
        color: "white",
        fontSize: 23,
        fontFamily: "Roboto-Bold",
    },
});
