import {Text, View, Image} from "react-native";
import hallStyles from "@/assets/styles/hall";
import React from "react";

import Hall from "@/src/models/entity/Hall"

const HallPickerSmallPreview:React.FC<{hall:Hall}> = ({ hall }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <View
            style={[
                hallStyles.hallPickerContainer,
                isHovered && hallStyles.hallPickerContainerHovered
            ]}
            // @ts-ignore
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                source={require("@/assets/images/no-image.jpg")}
                style={hallStyles.hallImage}
            />
            <View style={hallStyles.hallInfoContainer}>
                <Text style={hallStyles.hallName}>{hall.name}</Text>
                <Text style={hallStyles.hallAddress}>{hall.address}</Text>
            </View>
            <View style={hallStyles.arrowContainer}>
                <Text style={hallStyles.arrow}>›</Text>
            </View>
        </View>
    );
};
export default HallPickerSmallPreview;