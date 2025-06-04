import {View, Text} from "react-native";
import ScreenContainerView from "@/src/components/ScreenContainerView";

import textStyles from '@/assets/styles/text'
import containerStyles from "@/assets/styles/container";
import HallPicker from "@/src/components/reservation/HallPicker";
import withAuth from "@/src/components/hoc/WithAuth";
import {useState} from "react";
import ReservationRequest from "@/src/models/dto/ReservationRequest";
import ProgressBar from "@/src/components/progressbar/ProgressBar";
import ReservationDetails from "@/src/components/reservation/ReservationDetails";
import ReservationTerrainPicker from "@/src/components/reservation/ReservationTerrainPicker";
import {useUserData} from "@/src/context/UserContext";
import Loader from "@/src/components/loader/Loader";

function ReservationIndex() {
    const [formData, setFormData] = useState<ReservationRequest>({} as ReservationRequest);
    const [step, setStep] = useState(1);
    const {userData, loading} = useUserData();

    const changeFormData = (key: string, value: any) => {
        setFormData((prevState) => ({...prevState, [key]: value}));

        if (key === "hall") {
            setStep(2);
        } else if (key === "terrainAndDate") {
            setStep(3);
        }
    }

    return (
        <ScreenContainerView>
            <View style={[containerStyles.screenContainerContent, {margin: 0, padding: 0}]}>
                {
                    loading ? <Loader /> :
                    step === 1 ? <HallPicker changeFormData={changeFormData}/> :
                        step === 2 ? <ReservationTerrainPicker changeFormData={changeFormData} formData={formData}/> :
                            step === 3 ? <ReservationDetails changeFormData={changeFormData} formData={formData}
                                                             setFormData={setFormData} userData={userData}/> : null
                }

            </View>
        </ScreenContainerView>
    )
}

export default withAuth(ReservationIndex)