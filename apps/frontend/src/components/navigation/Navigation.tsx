import NavigationProps from "@/src/types/NavigationProps";
import React, {useEffect, useRef, useState} from "react";
import {Animated, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import navigationStyles from "@/assets/styles/navigation";
import textStyles from "@/assets/styles/text";
import shadowStyles from "@/assets/styles/shadow";
import Icon from "@/src/components/icon/Icon";
import ActionButton from "@/src/components/button/ActionButton";
import {useRouter} from "expo-router";

const Navigation: React.FC<NavigationProps> = ({selectedSection, setSelectedSection}) => {
    const [addButtonPressed, setAddButtonPressed] = useState<boolean>(false);
    const rotation = useRef(new Animated.Value(0)).current;

    const router = useRouter();

    useEffect(() => {
        Animated.timing(rotation, {
            toValue: addButtonPressed ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [addButtonPressed]);

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"],
    });

    return (
        <View style={navigationStyles.navigationSectionContainer}>
            <TouchableOpacity
                style={[navigationStyles.navigationSection]}
                onPress={() => setSelectedSection(0)}
            >
                <View
                    style={[
                        navigationStyles.navigationIcon,
                        selectedSection === 0 ? navigationStyles.navigationSelectedIcon : {},
                    ]}
                >
                    <Icon name={"home"} size={20} color={selectedSection === 1 ? "#000" : "white"}/>
                </View>
                <Text style={textStyles.text}>Početna</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[navigationStyles.navigationSection]}
                onPress={() => setSelectedSection(1)}
            >
                <View
                    style={[
                        navigationStyles.navigationIcon,
                        selectedSection === 1 ? navigationStyles.navigationSelectedIcon : {},
                    ]}
                >
                    <Icon name={"shoppingCart"} size={20} color={selectedSection === 1 ? "#000" : "white"}/>
                </View>
                <Text style={textStyles.text}>Trgovina</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setAddButtonPressed(true)} activeOpacity={0.8}>
                <Animated.View
                    style={[
                        navigationStyles.navigationAddButton,
                        shadowStyles.mediumShadow,
                        {transform: [{rotate: rotateInterpolate}]},
                    ]}
                >
                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        <Icon name={"add"} size={26} color={"white"}/>
                    </View>
                </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[navigationStyles.navigationSection]}
                onPress={() => setSelectedSection(2)}
            >
                <View
                    style={[
                        navigationStyles.navigationIcon,
                        selectedSection === 2 ? navigationStyles.navigationSelectedIcon : {},
                    ]}
                >
                    <Icon name={"robot"} size={20} color={selectedSection === 2 ? "#000" : "white"}/>
                </View>
                <Text style={textStyles.text}>AI</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[navigationStyles.navigationSection]}
                onPress={() => setSelectedSection(3)}
            >
                <View
                    style={[
                        navigationStyles.navigationIcon,
                        selectedSection === 3 ? navigationStyles.navigationSelectedIcon : {},
                    ]}
                >
                    <Icon name={"trophy"} size={20} color={selectedSection === 3 ? "#000" : "white"}/>
                </View>
                <Text style={textStyles.text}>Natjecanja</Text>
            </TouchableOpacity>

            <Modal
                visible={addButtonPressed}
                transparent={true}
                animationType="fade"
                statusBarTranslucent={true}
            >
                <TouchableWithoutFeedback onPress={() => setAddButtonPressed(false)}>
                    <View style={navigationStyles.navigationCreateSectionModal}>
                        <TouchableWithoutFeedback onPress={() => {
                        }}>
                            <View style={navigationStyles.navigationAddButtonModalButtonsContainer}>
                                <ActionButton text={"Objavi oglas"} color={"white"} />
                                <ActionButton text={"Rezerviraj termin"} color={"orange"}
                                              onClick={() => router.push("/reservation")} />
                                <TouchableOpacity
                                    style={navigationStyles.navigationAddButtonModalContainer}
                                    onPress={() => setAddButtonPressed(false)}
                                    activeOpacity={0.8}
                                >
                                    <Animated.View
                                        style={[
                                            navigationStyles.navigationAddButtonModal,
                                            shadowStyles.mediumShadow,
                                            {transform: [{rotate: rotateInterpolate}]},
                                        ]}
                                    >
                                        <View style={{alignItems: "center", justifyContent: "center"}}>
                                            <Icon name={"add"} size={26} color={"white"}/>
                                        </View>
                                    </Animated.View>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default Navigation;
