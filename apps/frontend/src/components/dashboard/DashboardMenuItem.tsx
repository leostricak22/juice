import React from "react";
import { Image, Text, View, Pressable } from "react-native";
import dashboardStyles from "@/assets/styles/dashboard";
import textStyles from "@/assets/styles/text";
import {Href, RelativePathString, useRouter} from "expo-router";

interface DashboardMenuItemProps {
    image: any;
    title: string;
    redirect: any;
}

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({ image, title, redirect }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const router  = useRouter();

    return ( // @ts-ignore
        <Pressable onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={[
                dashboardStyles.dashboardMenuItem,
                isHovered && dashboardStyles.dashboardMenuItemHover
            ]}
           onPress={() => router.push(redirect)}
        >
            <Image
                source={image}
                style={dashboardStyles.dashboardMenuItemImage}
            />
            <Text style={[
                textStyles.uppercase,
                textStyles.headingSmall,
                textStyles.alignCenter
            ]}>
                {title}
            </Text>
        </Pressable>
    );
};

export default DashboardMenuItem;
