import React from "react";
import { Image, Text, View, Pressable } from "react-native";
import dashboardStyles from "@/assets/styles/dashboard";
import textStyles from "@/assets/styles/text";

interface DashboardMenuItemProps {
    image: any;
    title: string;
}

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({ image, title }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return ( // @ts-ignore
        <Pressable onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={[
                dashboardStyles.dashboardMenuItem,
                isHovered && dashboardStyles.dashboardMenuItemHover
            ]}
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
