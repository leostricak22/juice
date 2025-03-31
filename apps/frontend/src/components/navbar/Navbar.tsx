import {Image, Platform, Text, View} from "react-native";
import React from "react";

// @ts-ignore
import LogoImage from '@/assets/images/logo-transparent-no-text.png';
// @ts-ignore
import DefaultAccountImage from "@/assets/images/account/default-image.png";
import Icon from "@/src/components/icon/Icon";

import textStyles from "@/assets/styles/text"
import colorStyles from "@/assets/styles/colors"
import navbarStyles from "@/assets/styles/navbar";

const Navbar: React.FC = () => {
    const platformOS = Platform.OS;

    return (
        <View style={navbarStyles.container}>
            {
                platformOS !== "web" &&
                <View style={navbarStyles.navbarIcon}>
                    <Icon name={"notifications"} size={40} />
                </View>
            }
            <View style={navbarStyles.logoTextContainer}>
                <Image source={LogoImage} style={{ height: 45, width: 40 }} />
                {
                    platformOS === "web" &&
                    <Text style={[textStyles.headingMedium, colorStyles.white, {marginTop: 3}]}>Juice</Text>
                }
            </View>
            <View style={platformOS === "web" ? navbarStyles.navbarIcons : navbarStyles.navbarIcon}>
                {
                    platformOS === "web" &&
                    <Icon name={"notifications"} size={50} />
                }
                <Image source={DefaultAccountImage} style={{ height: 60, width: 60 }} />
            </View>
        </View>
    )
}

export default Navbar;