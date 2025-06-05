import React, {useState} from "react";
import ReservationPickerProps from "@/src/types/ReservationPickerProps";
import {Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import textStyles from "@/assets/styles/text";
import shadowStyles from "@/assets/styles/shadow";
import CheckoutForm from "@/src/components/stripe/checkout-form";
import Icon from "@/src/components/icon/Icon";
import {Portal} from "react-native-portalize";
import AddPlayerToReservationModal from "@/src/components/reservation/AddPlayerToReservationModal";
import RemovePlayerFromReservationModal from "@/src/components/reservation/RemovePlayerFromReservationModal";

const mockTerrains = [
    {id: 1, name: "Terra 1"},
    {id: 2, name: "Terra 2"},
    {id: 3, name: "Terra 3"},
    {id: 4, name: "Terra 4"},
];

const ReservationDetails: React.FC<ReservationPickerProps> = ({changeFormData, formData, setFormData, userData}) => {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'club' | null>(null);
    const [playerIndexSelected, setPlayerIndexSelected] = useState<number | null>(null);

    if (!formData?.players) {
        changeFormData("players", [userData, null, null, null]);
    }

    return (
        <View>
            <ImageBackground
                source={require("@/assets/images/no-image.jpg")}
                resizeMode="cover"
                style={styles.imageBackground}
                imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
            >
                <Text style={styles.text}>{formData?.hall.name}</Text>
            </ImageBackground>
            <View style={styles.container}>
                <View style={styles.selectedReservationDateAndTime}>
                    <Text style={textStyles.headingSmall}>
                        {formData?.terrainAndDate.date
                            ? `${new Date(formData.terrainAndDate.date).toLocaleDateString("hr", {weekday: "long"}).charAt(0).toUpperCase() +
                            new Date(formData.terrainAndDate.date).toLocaleDateString("hr", {weekday: "long"}).slice(1)
                            } ${new Date(formData.terrainAndDate.date).toLocaleDateString("hr", {
                                day: "2-digit",
                                month: "2-digit"
                            }).replace(/\s/g, "")}`
                            : ""}
                    </Text>
                    <Text
                        style={textStyles.headingSmall}>{formData?.terrainAndDate.timeFrom} - {formData?.terrainAndDate.timeTo}</Text>
                </View>
                <Text style={textStyles.headingSmallNoBold}>{mockTerrains.find((terain) =>
                    terain.id === formData?.terrainAndDate.terrainId)?.name}</Text>
                <Text style={textStyles.headingSmallNoBold}>Dodaj igrače:</Text>
                <View style={{flexDirection: "row", gap: 10, justifyContent: "space-between", alignItems: "center"}}>
                    {[...Array(4)].map((_, i) => {
                        const player = formData?.players && formData?.players[i];
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

                <Text style={textStyles.headingSmallNoBold}>Način plaćanja:</Text>
                <View style={styles.paymentMethodContainer}>
                    <Pressable style={styles.paymentMethod} onPress={() => setPaymentMethod("card")}>
                        <Text style={paymentMethod === "card" && textStyles.bold}>Kartica</Text>
                        <Icon name={paymentMethod === "card" ? "creditCardSelected" : "creditCard"} size={60} />
                    </Pressable>
                    <Pressable style={styles.paymentMethod} onPress={() => setPaymentMethod("club")}>
                        <Text style={paymentMethod === "club" && textStyles.bold}>U klubu</Text>
                        <Icon name={paymentMethod === "club" ? "cashSelected" : "cash"} size={60} />
                    </Pressable>
                </View>

                {
                    paymentMethod === "card" &&
                    <Portal>
                        <View style={styles.reservationContainer}>
                            <Text style={[textStyles.headingSmall, textStyles.alignRight]}>Cijena 41.50€</Text>
                            <Text style={[textStyles.text, {color: "gray", marginBottom: 5}, textStyles.alignRight]}>Klikom na gumb prihvaćaš uvjete</Text>
                            <CheckoutForm amount={4150} data={formData}/>
                        </View>
                    </Portal>
                }
            </View>

            {
                // @ts-ignore
                playerIndexSelected && formData.players[playerIndexSelected] === null &&
                <AddPlayerToReservationModal playerIndexSelected={playerIndexSelected} formData={formData} setFormData={setFormData} setPlayerIndexSelected={setPlayerIndexSelected} />
            }
            {
                // @ts-ignore
                playerIndexSelected && formData.players[playerIndexSelected] !== null &&
                // @ts-ignore
                <RemovePlayerFromReservationModal playerIndexSelected={playerIndexSelected} formData={formData} setFormData={setFormData} setPlayerIndexSelected={setPlayerIndexSelected} user={formData.players[playerIndexSelected]} />
            }
        </View>
    )
}

export default ReservationDetails;

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        gap: 15,
        paddingHorizontal: 16,
    },
    imageBackground: {
        flex: 1,
        justifyContent: "flex-end",
        height: 130,
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