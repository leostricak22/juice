import React, {useEffect, useState} from "react";
import {Alert, Image, ImageBackground, StyleSheet, Text, View} from "react-native";
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

const ViewReservation: React.FC = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getReservation = async () => {
        setLoading(true);

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
        getReservation();
    }, []);

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
                <View style={styles.selectedReservationDateAndTime}>
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

                <Text style={textStyles.headingSmallNoBold}>{reservation.terrain.name}</Text>
                <Text style={textStyles.headingSmallNoBold}>Dodaj igrače:</Text>
                <View style={{flexDirection: "row", gap: 10, justifyContent: "space-between", alignItems: "center"}}>
                    {[...Array(4)].map((_, i) => {
                        const player = reservation.players && reservation.players[i];
                        const playerElement = player ? (
                            <Image
                                key={`player-${i}`}
                                source={player.profilePicture ?? require("@/assets/images/account/default-image.png")}
                                style={[
                                    shadowStyles.largeShadow,
                                    {width: "20%", aspectRatio: 1, borderRadius: 20},
                                ]}
                            />
                        ) : (
                            <View
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
                                    shadowStyles.largeShadow,
                                ]}
                            >
                                <Icon name={"plus"}/>
                            </View>
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

            </View>
            <View>
                {reservation.payed && <Text style={[textStyles.alignRight, textStyles.headingSmallNoBold, {padding: 15}]}>Plaćeno putem aplikacije.</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 15,
        paddingHorizontal: 16,
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
    }
})

export default ViewReservation;
