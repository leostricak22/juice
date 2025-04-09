import ReservationPickerProps from "@/src/types/ReservationPickerProps";
import {Text, View} from "react-native";

const ReservationDatePicker:React.FC<ReservationPickerProps> = ({changeFormData}) => {
    return (
        <View>
            <Text>DatePicker reserve</Text>
        </View>
    )
}

export default ReservationDatePicker;