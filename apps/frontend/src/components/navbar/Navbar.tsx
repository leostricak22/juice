import React, {useEffect} from "react";
import { Image, View } from "react-native";
// @ts-ignore
import DefaultAccountImage from "@/assets/images/account/default-image.png";
import Icon from "@/src/components/icon/Icon";
import navbarStyles from "@/assets/styles/navbar";
import {usePathname} from "expo-router";

const Navbar: React.FC = () => {
    const pathname = usePathname();

    useEffect(() => {
        console.log("Path changed to:", pathname);
    }, [pathname]);

    const isLogin = pathname === "/auth/login" || pathname === "/auth/register";
    if (isLogin) {
        return null;
    }

    const isDashboard = pathname === "/dashboard" || pathname === "/";

    return (
        <View style={navbarStyles.container}>
            {isDashboard ? (
                <View style={navbarStyles.logoTextContainer}>
                    <Icon name={"juiceNavbarLogo"} size={120} />
                </View>
            ) : <Icon name={"arrowLeft"} />
            }
            {
                !isDashboard && <Icon name={"logo"} size={36} />
            }
            <Image source={DefaultAccountImage} style={{ height: 40, width: 40 }} />
        </View>
    );
};

export default Navbar;