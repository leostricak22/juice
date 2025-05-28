import {View} from "react-native";
import React from "react";

export default function Hr({margin=0} : Readonly<{ margin?: number }>) {
    return (
        <View style={{ width: '100%', height: 1, backgroundColor: '#000', marginVertical: margin }} />
    )
}