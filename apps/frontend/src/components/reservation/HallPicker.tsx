import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import Hall from "@/src/models/entity/Hall";
import dataFetch from "@/src/utils/DataFetch";
import {isResponseError} from "@/src/utils/Validation";

import hallStyles from "@/assets/styles/hall";
import textStyles from "@/assets/styles/text";

const HallPicker: React.FC<any> = () => {
    const [halls, setHalls] = useState<Hall[]>();
    const [isFetched, setIsFetched] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const hallsResponse = await dataFetch<Hall[]>(
                `${process.env.EXPO_PUBLIC_API_URL}/api/hall`,
                "GET"
            );

            if (!isResponseError(hallsResponse)) {
                setHalls((hallsResponse as Hall[]));
                setIsFetched(true);
            }
        }

        if (!isFetched)
            fetchData().then(r => r);
    }, []);

    return (
        <View>
            {
                halls && halls.map((hall: Hall) => (
                    <View style={hallStyles.hallPickerContainer}>
                        <Text>{hall.name}</Text>
                    </View>
                ))
            }
        </View>
    )
}

export default HallPicker;