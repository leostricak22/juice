import React, {useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import Hall from "@/src/models/entity/Hall";
import dataFetch from "@/src/utils/DataFetch";
import {isResponseError} from "@/src/utils/Validation";

import HallPickerSmallPreview from "@/src/components/reservation/HallPickerSmallPreview";
import textStyles from "@/assets/styles/text";
import ReservationPickerProps from "@/src/types/ReservationPickerProps";

const HallPicker: React.FC<ReservationPickerProps> = ({changeFormData}) => {
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
            <Text style={[textStyles.headingSmall]}>Odaberite dvoranu:</Text>
            {
                halls && halls.map((hall: Hall) => (
                    <Pressable key={hall.id} onPress={() => changeFormData("hall", hall)}>
                        <HallPickerSmallPreview hall={hall} />
                    </Pressable>
                ))
            }
        </View>
    )
}

export default HallPicker;