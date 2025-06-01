import React, {useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import Hall from "@/src/models/entity/Hall";
import dataFetch from "@/src/utils/DataFetch";
import {isResponseError} from "@/src/utils/Validation";

import HallPickerSmallPreview from "@/src/components/reservation/HallPickerSmallPreview";
import Input from "@/src/components/input/Input";
import textStyles from "@/assets/styles/text";
import ReservationPickerProps from "@/src/types/ReservationPickerProps";
import Icon from "../icon/Icon";

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
        <>
            <View style={{paddingHorizontal: 14, gap: 10}}>
                <Text style={[textStyles.headingSmall]}>Odaberi dvoranu</Text>
                <Input value={""} placeholder={"Pretraga..."} icon={"search"}></Input>
                <Icon name={"filter"}/>
            </View>
            <View style={{marginTop: 10, gap: 20}}>
                {
                    halls && halls.map((hall: Hall) => (
                        <HallPickerSmallPreview key={hall.id} hall={hall}
                                                onSectionPress={() => changeFormData("hall", hall)}/>
                    ))
                }
            </View>
        </>
    )
}

export default HallPicker;