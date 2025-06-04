import React, {useEffect, useState} from "react";
import {
    Alert,
    Image,
    ImageBackground,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {useLocalSearchParams} from "expo-router";
import textStyles from "@/assets/styles/text";
import shadowStyles from "@/assets/styles/shadow";
import Icon from "@/src/components/icon/Icon";
import Reservation from "@/src/models/entity/Reservation";
import MessageResponse from "@/src/models/dto/MessageResponse";
import ErrorResponse from "@/src/models/dto/ErrorResponse";
import dataFetch from "@/src/utils/DataFetch";
import {isResponseError} from "@/src/utils/Validation";
import Loader from "@/src/components/loader/Loader";
import AddPlayerToReservationModal from "@/src/components/reservation/AddPlayerToReservationModal";
import RemovePlayerFromReservationModal from "@/src/components/reservation/RemovePlayerFromReservationModal";

const ViewReservation: React.FC = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [playerIndexSelected, setPlayerIndexSelected] = useState<number | null>(null);

    const getReservation = async () => {
        let response: Reservation | MessageResponse | ErrorResponse;
        try {
            response = await dataFetch<Reservation>(`${process.env.EXPO_PUBLIC_API_URL}/api/reservation/${id}`, "GET");
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", error instanceof Error ? error.message : "An error occurred while fetching the reservation.");
            return;
        }

        if (isResponseError(response)) {
            Alert.alert("Error", "An error occurred while fetching the reservation.");
            setLoading(false);
            return;
        }

        setReservation(response as Reservation);
        setLoading(false);
    };

    useEffect(() => {
        if(playerIndexSelected === null)
            getReservation();
    }, [playerIndexSelected]);

    if (loading || !reservation)
        return <Loader />

    return (
        <View style={{flex: 1}}>
            <ImageBackground
                source={require("@/assets/images/no-image.jpg")}
                resizeMode="cover"
                style={styles.imageBackground}
                imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
            >
                <Text style={styles.text}>{reservation.hall.name}</Text>
            </ImageBackground>
            <View style={styles.container}>
                <View style={[styles.selectedReservationDateAndTime, {paddingHorizontal: 16}]}>
                    <Text style={textStyles.headingSmall}>
                        {reservation.date
                            ? `${new Date(reservation.date).toLocaleDateString("hr", {weekday: "long"}).charAt(0).toUpperCase() +
                            new Date(reservation.date).toLocaleDateString("hr", {weekday: "long"}).slice(1)
                            } ${new Date(reservation.date).toLocaleDateString("hr", {
                                day: "2-digit",
                                month: "2-digit"
                            }).replace(/\s/g, "")}`
                            : ""}
                    </Text>
                    <Text
                        style={textStyles.headingSmall}>{reservation.timeFrom} - {reservation.timeTo}</Text>
                </View>

                <Text style={[textStyles.headingSmallNoBold, {paddingHorizontal: 16}]}>{reservation.terrain.name}</Text>
                <View style={{flexDirection: "row", gap: 10, justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16}}>
                    {[...Array(4)].map((_, i) => {
                        const player = reservation.players && reservation.players[i];
                        const playerElement = player ? (
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    if (i !== null)
                                        setPlayerIndexSelected(i)
                                }}
                                style={[
                                    shadowStyles.smallShadow,
                                    {
                                        width: "20%",
                                        aspectRatio: 1,
                                        borderRadius: 20,
                                        overflow: "hidden",
                                    },
                                ]}
                            >
                                <Image
                                    source={
                                        player?.profilePicture ??
                                        require("@/assets/images/account/default-image.png")
                                    }
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        resizeMode: "cover",
                                    }}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => setPlayerIndexSelected(i)}
                                key={`player-${i}`}
                                style={[
                                    {
                                        width: "20%",
                                        aspectRatio: 1,
                                        borderRadius: 100,
                                        borderWidth: 1,
                                        borderColor: "black",
                                        backgroundColor: "white",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    },
                                    shadowStyles.smallShadow,
                                ]}
                            >
                                <Icon name={"plus"}/>
                            </TouchableOpacity>
                        );

                        if (i === 1) {
                            return (
                                <React.Fragment key={i}>
                                    {playerElement}
                                    <View style={{alignItems: "center", justifyContent: "center"}}>
                                        <View
                                            style={{
                                                width: 2,
                                                height: 85,
                                                backgroundColor: "#F57E20",
                                            }}
                                        />
                                    </View>
                                </React.Fragment>
                            );
                        }

                        return playerElement;
                    })}
                </View>

                <View style={styles.sectionsContainer}>
                    <View style={styles.section}>
                        <Icon name={"chat"} />
                        <Text>Chat</Text>
                    </View>

                    <View style={styles.section}>
                        <Icon name={"personSearch"} />
                        <Text>Fali mi igrač</Text>
                    </View>
                </View>
            </View>


            <View>
                {reservation.payed && <Text style={[textStyles.alignRight, textStyles.headingSmallNoBold, {padding: 15}]}>Plaćeno putem aplikacije.</Text>}
            </View>

            {
                playerIndexSelected && reservation.players.length <= playerIndexSelected &&
                <AddPlayerToReservationModal reservationId={reservation.id} setPlayerIndexSelected={setPlayerIndexSelected} />
            }
            {
                playerIndexSelected && reservation.players.length > playerIndexSelected &&
                <RemovePlayerFromReservationModal reservationId={reservation.id} setPlayerIndexSelected={setPlayerIndexSelected} user={reservation.players[playerIndexSelected]} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 15,
        paddingTop: 10,
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: "flex-end",
        height: 130,
        maxHeight: 130,
        width: "100%",
    },
    text: {
        color: "white",
        fontSize: 23,
        fontFamily: "Roboto-Bold",
        padding: 10,
        paddingLeft: 16,
    },
    selectedReservationDateAndTime: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    paymentMethodContainer: {
        width: "100%",
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    paymentMethod: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 15
    },
    reservationContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        marginBottom: 0,
        padding: 15,
        gap: 5
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 15,
        backgroundColor: "white",
        ...shadowStyles.smallShadow,
    },
    sectionsContainer: {
        gap: 30,
        marginTop: 20
    }
})

export default ViewReservation;
