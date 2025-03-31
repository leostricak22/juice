import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
// @ts-ignore
import LogoImage from '@/assets/images/logo-transparent-no-text.png';
// @ts-ignore
import DefaultAccountImage from "@/assets/images/account/default-image.png";
import Icon from "@/src/components/icon/Icon";
import textStyles from "@/assets/styles/text";
import colorStyles from "@/assets/styles/colors";
import navbarStyles from "@/assets/styles/navbar";
import { useUserData } from "@/src/context/UserContext";

const Navbar: React.FC = () => {
    const { userData } = useUserData();
    const isLoggedIn = Boolean(userData);

    return (
        <View style={isLoggedIn ? navbarStyles.container : navbarStyles.containerCenterLogo}>
            <View style={navbarStyles.logoTextContainer}>
                <Image source={LogoImage} style={{ height: 45, width: 40 }} />
                <Text style={[textStyles.headingSmall, colorStyles.white, textStyles.uppercase, { marginTop: 3 }]}>
                    Juice
                </Text>
            </View>
            {isLoggedIn && (
                <View style={navbarStyles.navbarIcons}>
                    <Icon name={"notifications"} size={50} />
                    <Image source={DefaultAccountImage} style={{ height: 60, width: 60 }} />
                </View>
            )}
        </View>
    );
};

export default Navbar;
