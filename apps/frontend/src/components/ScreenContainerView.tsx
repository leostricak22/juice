import containerStyles from "@/assets/styles/container";
import {ScrollView} from "react-native";
import React, {useState} from "react";
import Navigation from "@/src/components/navigation/Navigation";

const ScreenContainerView: React.FC<{children:any}> = ({ children }) => {
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={containerStyles.scrollViewContainer}
            showsVerticalScrollIndicator={true}
        >
            {children}
        </ScrollView>
    )
}

export default ScreenContainerView;