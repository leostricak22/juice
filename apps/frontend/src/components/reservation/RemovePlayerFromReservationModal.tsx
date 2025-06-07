import React from "react";
import {Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "@/src/components/icon/Icon";
import textStyles from "@/assets/styles/text";
import User from "@/src/models/entity/User";
import ActionButton from "@/src/components/button/ActionButton";
import {rgbaColor} from "react-native-reanimated/lib/typescript/Colors";
import MessageResponse from "@/src/models/dto/MessageResponse";
import ErrorResponse from "@/src/models/dto/ErrorResponse";
import dataFetch from "@/src/utils/DataFetch";
import {isResponseError} from "@/src/utils/Validation";
import ReservationRequest from "@/src/models/dto/ReservationRequest";

type RemovePlayerToReservationModalProps = {
    reservationId: string;
    setPlayerIndexSelected: (index: number | null) => void;
    user: User;
    formData?: ReservationRequest;
    setFormData?: (data: ReservationRequest) => void;
    playerIndexSelected: number | null;
};

const RemovePlayerFromReservationModal: React.FC<RemovePlayerToReservationModalProps> = ({
                                                                                             user,
                                                                                             reservationId,
                                                                                             setPlayerIndexSelected,
                                                                                             formData,
                                                                                             setFormData,
                                                                                             playerIndexSelected
                                                                                         }) => {

    const handleRemovePlayer = async () => {
        if (formData && setFormData) {
            const updatedPlayers = formData.players?.map((player, index) => index === playerIndexSelected ? null : player);
            setFormData({
                ...formData,
                // @ts-ignore
                players: updatedPlayers
            });

            setPlayerIndexSelected(null);
            return;
        }

        let response: User[] | MessageResponse | ErrorResponse;
        try {
            response = await dataFetch<User[]>(`${process.env.EXPO_PUBLIC_API_URL}/api/reservation/${reservationId}/remove-player/${user.id}`, "POST",
                {playerIndexSelected});
        } catch (error) {
            Alert.alert("Error", error instanceof Error ? error.message : "An error occurred while removing player.");
            return;
        }

        if (isResponseError(response)) {
            Alert.alert("Error", "An error occurred.");
            return;
        }

        setPlayerIndexSelected(null);
    }

    console.log(user)

    return (
        <Modal
            transparent
            style={styles.modalContainer}
            animationType="fade"
        >
            <View style={{height: "37%", backgroundColor: "rgba(217,217,217,0.8)"}}></View>
            <View style={[styles.modalContent]}>
                <Text style={textStyles.headingSmall}>Ukloni igrača?</Text>
                <View style={styles.userContainer}>
                    <Image style={styles.userImage}
                           source={user.profileImage ? {uri: user.profileImage} : require("@/assets/images/account/default-image.png")}/>
                    <Text style={textStyles.headingSmallNoBold}>{user.name} {user.surname}</Text>
                </View>
                <View style={styles.buttonSection}>
                    <View style={styles.buttonContainer}>
                        <ActionButton text={"Odustani"} onClick={() => setPlayerIndexSelected(null)} color={"white"}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <ActionButton text={"Ukloni"} onClick={handleRemovePlayer} color={"orange"}/>
                    </View>
                </View>
            </View>
            <View style={{height: "37%", backgroundColor: "rgba(217,217,217,0.8)"}}></View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "transparent",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        flex: 1,
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 10,
    },
    buttonSection: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonContainer: {
        width: "48%",
    }
});

export default RemovePlayerFromReservationModal;