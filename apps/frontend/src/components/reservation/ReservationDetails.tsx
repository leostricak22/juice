import React, {useState} from "react";
import ReservationPickerProps from "@/src/types/ReservationPickerProps";
import {Text, TextInput, View} from "react-native";
import ScreenContainerView from "@/src/components/ScreenContainerView";

import textStyles from "@/assets/styles/text";
import ActionButton from "@/src/components/button/ActionButton";
import Checkbox from "@/src/components/input/CheckBox";
import RadioButton from "@/src/components/input/RadioButton";
import Hr from "@/src/components/divider/Hr";
import CheckoutForm from "@/src/components/stripe/checkout-form";

const ReservationDetails: React.FC<ReservationPickerProps> = ({changeFormData, formData}) => {
    const [selectedOption, setSelectedOption] = useState<'app' | 'club' | null>('app');

    return (
        <View>
            <Text style={textStyles.headingSmall}>Dvorana</Text>
            <Text style={[textStyles.text, textStyles.bold]}>{formData?.hall.name}</Text>
            <Text style={textStyles.text}>{formData?.hall.address}</Text>

            <Text style={[textStyles.headingSmall, {marginTop:20}]}>Datum</Text>
            <Text style={[textStyles.text]}>{formData?.date.toLocaleDateString("hr", {
                day: "numeric",
                month: "numeric",
                weekday: "short"
            })}, {formData?.time}</Text>

            <Text style={[textStyles.headingSmall, {marginTop:20}]}>Način plaćanja</Text>
            <RadioButton
                label="Plaćanje putem aplikacije"
                selected={selectedOption === 'app'}
                onPress={() => setSelectedOption('app')}
            />
            <RadioButton
                label="Plaćanje u klubu"
                selected={selectedOption === 'club'}
                onPress={() => setSelectedOption('club')}
            />

            <Hr margin={15} />

            {
                selectedOption === 'app' ?
                <>
                    <Text style={textStyles.headingSmall}>
                        Za platiti: 40.20€
                    </Text>
                    <Text style={textStyles.text}>
                        Termin: <Text style={textStyles.bold}>40.00€</Text>
                    </Text>
                    <Text style={textStyles.text}>
                        Troškovi: <Text style={textStyles.bold}>0.20€</Text>
                    </Text>
                    <Text style={[textStyles.text, {marginBottom: 20}]}>
                        Uplata se vrši putem aplikacije.
                    </Text>
                </> :
                selectedOption === 'club' &&
                <>
                    <Text style={[textStyles.text, {marginBottom: 20}]}>
                        Plaćanje se odvija u klubu.
                    </Text>
                </>
            }
            <CheckoutForm amount={4020} data={formData} />
        </View>
    )
}

export default ReservationDetails;