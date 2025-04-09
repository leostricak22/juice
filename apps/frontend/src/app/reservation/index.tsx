import {View, Text} from "react-native";
import ScreenContainerView from "@/src/components/ScreenContainerView";

import textStyles from '@/assets/styles/text'
import containerStyles from "@/assets/styles/container";
import HallPicker from "@/src/components/reservation/HallPicker";

export default function ReservationIndex() {
    return (
       <ScreenContainerView>
           <View style={containerStyles.screenContainerContent}>
               <Text style={[textStyles.heading, textStyles.alignCenter]}>Rezervacija termina</Text>
               <Text style={[textStyles.headingSmall, textStyles.alignCenter]}>Odaberite dvoranu</Text>
               <HallPicker />
           </View>
       </ScreenContainerView>
    )
}