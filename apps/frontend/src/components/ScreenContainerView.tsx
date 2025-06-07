import containerStyles from "@/assets/styles/container";
import {ScrollView} from "react-native";
import React from "react";

const ScreenContainerView: React.FC<{children:any, backgroundColor?:string}> = ({ children, backgroundColor="white" }) => {
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[containerStyles.scrollViewContainer, {backgroundColor}]}
            showsVerticalScrollIndicator={true}
        >
            {children}
        </ScrollView>
    )
}

export default ScreenContainerView;