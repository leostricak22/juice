import {View, Text} from "react-native";
import ScreenContainerView from "@/src/components/ScreenContainerView";

import textStyles from '@/assets/styles/text'
import containerStyles from "@/assets/styles/container";
import HallPicker from "@/src/components/reservation/HallPicker";
import withAuth from "@/src/components/hoc/WithAuth";
import {useState} from "react";
import ReservationRequest from "@/src/models/dto/ReservationRequest";
import ProgressBar from "@/src/components/progressbar/ProgressBar";
import ReservationDatePicker from "@/src/components/reservation/ReservationDatePicker";
import ReservationDetails from "@/src/components/reservation/ReservationDetails";

function ReservationIndex() {
    const [formData, setFormData] = useState<ReservationRequest>({} as ReservationRequest);
    const [step, setStep] = useState(1);

    const changeFormData = (key: string, value:any) => {
        setFormData((prevState) => ({...prevState, [key]:value}));

        if (key === "hall") {
            setStep(2);
        } else if (key === "date") {
            setStep(3);
        }
    }

    return (
       <ScreenContainerView>
           <View style={containerStyles.screenContainerContent}>
               <ProgressBar step={step} maxStep={5} setStep={setStep} color={"#BC623CFF"} />
               <Text style={[textStyles.heading, textStyles.alignCenter]}>Rezervacija termina</Text>
               {
                   step === 1 ? <HallPicker changeFormData={changeFormData} /> :
                   step === 2 ? <ReservationDatePicker changeFormData={changeFormData} /> :
                   step === 3 ? <ReservationDetails changeFormData={changeFormData} formData={formData} /> : null
               }

           </View>
       </ScreenContainerView>
    )
}

export default withAuth(ReservationIndex)