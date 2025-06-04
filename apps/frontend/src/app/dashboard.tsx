import {StyleSheet, Text, View} from "react-native";
import withAuth from '@/src/components/hoc/WithAuth';
import React, {useState} from "react";
import PageProps from "@/src/types/PageProps";
import ActionButton from "@/src/components/button/ActionButton";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import containerStyles from "@/assets/styles/container";
import navigationStyles from "@/assets/styles/navigation";
import textStyles from "@/assets/styles/text";
import ScreenContainerView from "@/src/components/ScreenContainerView";
import {useUserData} from "@/src/context/UserContext";
import {handleUserDataChange} from "@/src/utils/UserDataChange";
import DashboardMenu from "@/src/components/dashboard/DashboardMenu";
import Navigation from "@/src/components/navigation/Navigation";
import UserReservations from "@/src/components/homepage/UserReservations";

const Dashboard: React.FC<PageProps> = ({ userData }) => {
    const router = useRouter();
    const { setUserData } = useUserData();
    const [selectedSection, setSelectedSection] = useState<number>(0);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await handleUserDataChange(setUserData)
        router.push("/auth/login");
    }

    return (
        <>
            <ScreenContainerView>
                <View style={[containerStyles.screenContainerContent, {paddingBottom: 80}]}>
                    {
                        selectedSection === 0 ? <View>
                            <UserReservations />
                        </View> :
                        selectedSection === 1 ? <View>
                            <Text>Trgovina</Text>
                        </View> :
                        selectedSection === 2 ? <View>
                            <Text>AI</Text>
                        </View> :
                        selectedSection === 3 ? <View>
                            <ActionButton text={"Logout"} color={"orange"} onClick={handleLogout} />
                        </View> : null
                    }
                </View>
            </ScreenContainerView>
            <View style={navigationStyles.navigationContainer}>
                <Navigation selectedSection={selectedSection} setSelectedSection={setSelectedSection}></Navigation>
            </View>

        </>
    );
}

export default withAuth(Dashboard);