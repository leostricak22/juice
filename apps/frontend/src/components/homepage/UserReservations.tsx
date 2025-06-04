import React, {useEffect, useState} from "react";
import {Alert, Pressable, StyleSheet, Text, View, Platform} from "react-native";
import textStyles from "@/assets/styles/text";
import shadowStyles from "@/assets/styles/shadow";
import dataFetch from "@/src/utils/DataFetch";
import Reservation from "@/src/models/entity/Reservation";
import MessageResponse from "@/src/models/dto/MessageResponse";
import ErrorResponse from "@/src/models/dto/ErrorResponse";
import {isResponseError} from "@/src/utils/Validation";
import Loader from "@/src/components/loader/Loader";
import {useRouter} from "expo-router";

const UserReservations: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const router = useRouter();

    const getUserReservations = async () => {
        setLoading(true);

        let response: Reservation[] | MessageResponse | ErrorResponse;
        try {
            response = await dataFetch<Reservation[]>(`${process.env.EXPO_PUBLIC_API_URL}/api/reservation/user`, "GET");
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", error instanceof Error ? error.message : "An error occurred while fetching reservations.");
            return;
        }

        if (isResponseError(response)) {
            Alert.alert("Error", "An error occurred while fetching reservations.");
            setLoading(false);
            return;
        }

        setReservations(response as Reservation[]);
        setLoading(false);
    };

    useEffect(() => {
        getUserReservations();
    }, []);

    return (
        <View style={{gap: 5, marginTop: 5}}>
            <Text style={[textStyles.headingMedium, {marginBottom: 5}]}>Moj raspored</Text>
            {
                loading ? (
                    <Loader/>
                ) : reservations && reservations.length > 0 ?
                    reservations.map((reservation) => {
                        const isHovered = hoveredId && hoveredId.toString() === reservation.id;
                        return (
                            <Pressable
                                key={reservation.id}
                                // @ts-ignore
                                onPress={() => router.push({pathname: "/reservation/view/" + reservation.id})}
                                onPressIn={() => setHoveredId(reservation.id)}
                                onPressOut={() => setHoveredId(null)}
                                style={[
                                    styles.reservation,
                                    shadowStyles.smallShadow,
                                    isHovered && styles.hoveredReservation,
                                ]}
                            >
                                <View style={styles.reservationRowContainer}>
                                    <Text style={textStyles.headingSmallNoBold}>
                                        {reservation.hall.name}
                                    </Text>
                                    <Text style={textStyles.headingSmall}>
                                        {new Date(reservation.date).toLocaleDateString("hr-HR", {
                                            day: "2-digit",
                                            month: "2-digit"
                                        })}
                                    </Text>
                                </View>

                                <View style={styles.reservationRowContainer}>
                                    <Text style={textStyles.headingSmallNoBold}>
                                        {reservation.terrain.name}
                                    </Text>
                                    <Text style={textStyles.headingSmall}>
                                        {reservation.timeFrom} - {reservation.timeTo}
                                    </Text>
                                </View>
                            </Pressable>
                        )
                    })
                : (
                    <Text style={textStyles.text}>No reservations found.</Text>
                )
            }
        </View>
    );
};

export default UserReservations;

const styles = StyleSheet.create({
    reservation: {
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: "#F57E20",
        borderRadius: 10,
        backgroundColor: "white",
        gap: 20
    },
    hoveredReservation: {
        backgroundColor: "#d5d5d5",
    },
    reservationRowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    }
});
