import React from "react";
import User from "@/src/models/entity/User";
import {Alert, Image, Modal, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import MessageResponse from "@/src/models/dto/MessageResponse";
import ErrorResponse from "@/src/models/dto/ErrorResponse";
import dataFetch from "@/src/utils/DataFetch";
import {isResponseError} from "@/src/utils/Validation";
import textStyles from "@/assets/styles/text";
import Icon from "@/src/components/icon/Icon";
import Loader from "@/src/components/loader/Loader";
import shadowStyles from "@/assets/styles/shadow";
import ReservationRequest from "@/src/models/dto/ReservationRequest";

type AddPlayerToReservationModalProps = {
    formData?: ReservationRequest;
    setFormData?: (data: ReservationRequest) => void;
    reservationId?: string;
    setPlayerIndexSelected: (index: number | null) => void;
    playerIndexSelected: number | null;
};

const AddPlayerToReservationModal: React.FC<AddPlayerToReservationModalProps> = ({
                                                                                     formData,
                                                                                     setFormData,
                                                                                     reservationId,
                                                                                     playerIndexSelected,
                                                                                     setPlayerIndexSelected
                                                                                 }) => {
    const [allUsers, setAllUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const getAllUsers = async () => {
        setLoading(true);

        let response: User[] | MessageResponse | ErrorResponse;
        try {
            if (formData) {
                response = await dataFetch<User[]>(`${process.env.EXPO_PUBLIC_API_URL}/api/reservation/get-all-users`, "POST",
                    {playerIds: formData.players?.filter(player => player !== null).map(player => player.id) || []});
            } else {
                response = await dataFetch<User[]>(`${process.env.EXPO_PUBLIC_API_URL}/api/reservation/${reservationId}/get-all-users`, "GET");
            }
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", error instanceof Error ? error.message : "An error occurred while fetching users.");
            return;
        }

        if (isResponseError(response)) {
            Alert.alert("Error", "An error occurred while fetching reservations.");
            setLoading(false);
            return;
        }

        setAllUsers(response as User[]);
        setLoading(false);
    };

    React.useEffect(() => {
        getAllUsers();
    }, []);

    const updatePlayer = async (user: User) => {
        setLoading(true);

        if (formData && setFormData) {
            // @ts-ignore
            formData.players ??= [null, null, null, null];

            if (playerIndexSelected !== null) {
                formData.players[playerIndexSelected] = user;
            }

            setFormData(formData);
            setPlayerIndexSelected(null);
            return;
        }

        let response: MessageResponse | ErrorResponse;
        try {
            response = await dataFetch<MessageResponse>(`${process.env.EXPO_PUBLIC_API_URL}/api/reservation/${reservationId}/add-player/${user.id}`, "POST",
                {playerIndexSelected});
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", error instanceof Error ? error.message : "An error occurred while adding the player.");
            return;
        }

        if (isResponseError(response)) {
            Alert.alert("Error", "An error occurred while adding the player.");
            setLoading(false);
            return;
        }

        setPlayerIndexSelected(null);
        setLoading(false);
    }

    return (
        <Modal
            transparent
            style={styles.modalContainer}
            animationType="slide"
        >
            <View style={{height: 190}}/>
            <View style={[styles.modalContent]}>
                <View style={styles.header}>
                    <Text style={textStyles.headingSmall}>Dodaj igrača</Text>
                    <TouchableOpacity onPress={() => setPlayerIndexSelected(null)}>
                        <Icon name={"close"}/>
                    </TouchableOpacity>
                </View>
                {
                    loading ? (
                            <Loader/>
                        ) :
                        allUsers && allUsers.length > 0 ? allUsers.map(user => (
                            <View key={user.id} style={styles.userContainer}>
                                <View style={styles.userInfo}>
                                    <Image style={styles.userImage}
                                           source={user.profilePicture ?? require("@/assets/images/account/default-image.png")}/>
                                    <Text style={textStyles.headingSmallNoBold}>{user.name} {user.surname}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => updatePlayer(user)}
                                    style={[
                                        {
                                            padding: 8,
                                            marginRight: 10,
                                            backgroundColor: "white",
                                            aspectRatio: 1,
                                            borderRadius: 100,
                                            borderWidth: 1,
                                            borderColor: "black",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        },
                                        shadowStyles.smallShadow,
                                    ]}
                                >
                                    <Icon name={"plus"} size={16}/>
                                </TouchableOpacity>
                            </View>
                        )) : (
                            <Text style={[textStyles.headingSmallNoBold, textStyles.alignCenter]}>Korisnici nisu
                                pronađeni.</Text>
                        )
                }
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    header: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "transparent",
        padding: 0,
        justifyContent: "flex-start",
    },
    modalContent: {
        flex: 1,
        padding: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: "white",
    },
});

export default AddPlayerToReservationModal;
