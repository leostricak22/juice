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
import ActionButton from "@/src/components/button/ActionButton";
import {backgroundColor} from "react-native-calendars/src/style";

const ViewReservation: React.FC = () => {
    const {id} = useLocalSearchParams<{ id: string }>();

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
        if (playerIndexSelected === null)
            getReservation();
    }, [playerIndexSelected]);

    if (loading || !reservation)
        return <Loader/>

    const handleResultEnter = async () => {
        setReservation(prev => prev ? {...prev, result: [[6, 3, 6], [4, 6, 2]]} : prev);
    }

    const isReservationPassed = new Date(reservation.date) < new Date() || (new Date(reservation.date).getTime() === new Date().getTime() && reservation.timeTo < new Date().toLocaleTimeString("hr", {
        hour: "2-digit",
        minute: "2-digit"
    }));

    const winnerTeam =
        reservation.result &&
        reservation.result.length === 2 &&
        reservation.result[0].length === 3 &&
        reservation.result[1].length === 3
            ? (() => {
                let teamASets = 0;
                let teamBSets = 0;
                for (let set = 0; set < 3; set++) {
                    if (reservation.result[0][set] > reservation.result[1][set]) {
                        teamASets++;
                    } else if (reservation.result[0][set] < reservation.result[1][set]) {
                        teamBSets++;
                    }
                }
                return teamASets > teamBSets ? "A" : "B";
            })()
            : null;

    return (
        <View style={{flex: 1}}>
            <ImageBackground
                source={reservation.hall?.image ? {uri: reservation.hall.image} : require("@/assets/images/no-image.jpg")}
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
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "space-around",
                    alignItems: "center",
                    paddingHorizontal: 16
                }}>
                    <Text
                        style={[textStyles.headingSmallNoBold, winnerTeam === "A" && {color: "#F57E20"}]}>A</Text>
                    <Text
                        style={[textStyles.headingSmallNoBold, winnerTeam === "B" && {color: "#F57E20"}]}>B</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 16
                }}>
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
                                        player?.profileImage ? {uri: player.profileImage} :
                                            require("@/assets/images/account/default-image.png")
                                    }
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        resizeMode: "cover",
                                        borderRadius: 50
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
                    {
                        !isReservationPassed &&
                        <View style={styles.section}>
                            <Icon name={"chat"}/>
                            <Text>Chat</Text>
                        </View>
                    }

                    {
                        !isReservationPassed &&
                        <View style={styles.section}>
                            <Icon name={"personSearch"}/>
                            <Text>Fali mi igrač</Text>
                        </View>
                    }

                    {
                        isReservationPassed && (
                            <View style={{marginLeft: 15}}>
                                <View style={[{flexDirection: 'row'}]}>
                                    <View style={styles.resultsTableCellFirstTop}><Text
                                        style={winnerTeam === "A" && {color: "#F57E20"}}>A</Text></View>
                                    <View
                                        style={styles.resultsTableCellTop}><Text>{reservation.result?.[0]?.[0] ?? "-"}</Text></View>
                                    <View
                                        style={styles.resultsTableCellTop}><Text>{reservation.result?.[0]?.[1] ?? "-"}</Text></View>
                                    <View
                                        style={styles.resultsTableCellLastTop}><Text>{reservation.result?.[0]?.[2] ?? "-"}</Text></View>
                                    {winnerTeam === "A" && (
                                        <View style={styles.crownContainer}>
                                            <Icon name={"crown"}/>
                                        </View>
                                    )}
                                </View>

                                <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                                    <View style={styles.resultsTableCellFirstBottom}><Text
                                        style={winnerTeam === "B" && {color: "#F57E20"}}>B</Text></View>
                                    <View
                                        style={styles.resultsTableCell}><Text>{reservation.result?.[1]?.[0] ?? "-"}</Text></View>
                                    <View
                                        style={styles.resultsTableCell}><Text>{reservation.result?.[1]?.[1] ?? "-"}</Text></View>
                                    <View
                                        style={styles.resultsTableCellLastBottom}><Text>{reservation.result?.[1]?.[2] ?? "-"}</Text></View>

                                    {winnerTeam === "B" && (
                                        <View style={styles.crownContainer}>
                                            <Icon name={"crown"}/>
                                        </View>)}
                                </View>
                            </View>
                        )
                    }

                    {
                        isReservationPassed &&
                        <View style={styles.section}>
                            <Icon name={"robotOrange"}/>
                            <Text>AI analiza</Text>
                        </View>
                    }
                </View>
            </View>

            <View>
                {reservation.payed &&
                    <Text style={[textStyles.alignRight, textStyles.headingSmallNoBold, {padding: 15}]}>Plaćeno putem
                        aplikacije.</Text>}
                {
                    isReservationPassed && !reservation.result &&
                    <View style={[{marginHorizontal: 15}, shadowStyles.largeShadow]}>
                        <ActionButton text={"Upiši rezultat"} color={"black"} onClick={handleResultEnter}/>
                    </View>
                }
            </View>

            {
                playerIndexSelected && reservation.players[playerIndexSelected] === null &&
                <AddPlayerToReservationModal playerIndexSelected={playerIndexSelected} reservationId={reservation.id}
                                             setPlayerIndexSelected={setPlayerIndexSelected}/>
            }
            {
                playerIndexSelected && reservation.players[playerIndexSelected] !== null &&
                <RemovePlayerFromReservationModal playerIndexSelected={playerIndexSelected}
                                                  reservationId={reservation.id}
                                                  setPlayerIndexSelected={setPlayerIndexSelected}
                                                  user={reservation.players[playerIndexSelected]}/>
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
    },
    resultsTable: {
        width: "50%",
        marginTop: 20,
        marginLeft: 15,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
    },
    resultsTableRow: {
        flexDirection: "row",
        borderBottomColor: "#ccc",
    },
    resultsTableCellLastBottom: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderBottomRightRadius: 15,
        width: 50

    },
    resultsTableCellFirstTop: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopLeftRadius: 15,
        width: 50

    },
    resultsTableCellFirstBottom: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomLeftRadius: 15,
        width: 50
    },
    resultsTableCellLastTop: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopRightRadius: 15,
        width: 50
    },
    resultsTableCell: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        width: 50
    },
    resultsTableCellTop: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        width: 50
    },
    crownContainer: {
        flex: 1,
        marginTop: 6,
        marginLeft: 10
    }
})

export default ViewReservation;
