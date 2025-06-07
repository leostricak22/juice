import React, {useEffect} from "react";
import {Image, Pressable, TouchableOpacity, View} from "react-native";
// @ts-ignore
import DefaultAccountImage from "@/assets/images/account/default-image.png";
import Icon from "@/src/components/icon/Icon";
import navbarStyles from "@/assets/styles/navbar";
import {usePathname, useRouter} from "expo-router";
import {useUserData} from "@/src/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {handleUserDataChange} from "@/src/utils/UserDataChange";

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { userData, setUserData } = useUserData();

    const isLogin = pathname === "/auth/login" || pathname === "/auth/register";

    useEffect(() => {
        console.log("Path changed to:", pathname);
    }, [pathname]);

    useEffect(() => {
        console.log(userData)
    }, [userData]);

    if (isLogin) {
        return null;
    }

    const isDashboard = pathname === "/dashboard" || pathname === "/";

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await handleUserDataChange(setUserData)
        router.push("/auth/login");
    }

    return (
        <View style={navbarStyles.container}>
            {isDashboard ? (
                <View style={navbarStyles.logoTextContainer}>
                    <Icon name={"juiceNavbarLogo"} size={120} />
                </View>
            ) : (
                <TouchableOpacity onPress={router.back}>
                    <Icon name={"arrowLeft"} />
                </TouchableOpacity>
            )}
            {!isDashboard && <Icon name={"logo"} size={36} />}
            <Pressable  onPress={handleLogout}>
                <Image
                    source={
                        userData && userData.profileImage
                            ? { uri: userData.profileImage }
                            : DefaultAccountImage
                    }
                    style={{ height: 40, width: 40, borderRadius: 50 }}
                />
            </Pressable>
        </View>
    );
};


export default Navbar;