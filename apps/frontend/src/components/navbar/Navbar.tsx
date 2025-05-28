import React from "react";
import { Image, View } from "react-native";
// @ts-ignore
import DefaultAccountImage from "@/assets/images/account/default-image.png";
import Icon from "@/src/components/icon/Icon";
import navbarStyles from "@/assets/styles/navbar";
import { useUserData } from "@/src/context/UserContext";

const Navbar: React.FC = () => {
    const { userData } = useUserData();

    return (
        <View style={navbarStyles.container}>
            <View style={navbarStyles.logoTextContainer}>
                <Icon name={"juiceNavbarLogo"} size={120} />
            </View>
                <Image source={DefaultAccountImage} style={{ height: 40, width: 40 }} />
        </View>
    );
};

export default Navbar;
