import ReservationPickerProps from "@/src/types/ReservationPickerProps";
import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Platform,
    Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import shadowStyles from "@/assets/styles/shadow";
import Icon from "@/src/components/icon/Icon";

const mockTerrains = [
    { id: 1, name: "Terra 1" },
    { id: 2, name: "Terra 2" },
    { id: 3, name: "Terra 3" },
    { id: 4, name: "Terra 4" },
];

const mockReservedTimes = [
    { terrainId: 1, timeFrom: "10:00", timeTo: "11:30", date: Date.now() },
    { terrainId: 1, timeFrom: "11:30", timeTo: "12:30", date: Date.now() },
    { terrainId: 1, timeFrom: "13:00", timeTo: "14:00", date: Date.now() },
    { terrainId: 2, timeFrom: "12:00", timeTo: "13:30", date: Date.now() },
    { terrainId: 2, timeFrom: "14:00", timeTo: "15:00", date: Date.now() },
    { terrainId: 2, timeFrom: "16:00", timeTo: "17:00", date: Date.now() },
    { terrainId: 3, timeFrom: "14:00", timeTo: "15:30", date: Date.now() },
    { terrainId: 3, timeFrom: "16:00", timeTo: "17:30", date: Date.now() },
    { terrainId: 4, timeFrom: "09:30", timeTo: "11:00", date: Date.now() },
    { terrainId: 4, timeFrom: "12:00", timeTo: "13:00", date: Date.now() },
    { terrainId: 4, timeFrom: "15:00", timeTo: "16:30", date: Date.now() },
];

const ReservationTerrainPicker: React.FC<ReservationPickerProps> = ({
                                                                     changeFormData,
                                                                     formData,
                                                                 }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const hours = Array.from({ length: 17 }, (_, i) => 7 + i);

    const changeDate = (days: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    const onChange = (event: any, date?: Date) => {
        setShowPicker(Platform.OS === "ios");
        if (date) {
            setSelectedDate(date);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("@/assets/images/no-image.jpg")}
                resizeMode="cover"
                style={styles.imageBackground}
                imageStyle={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
            >
                <Text style={styles.text}>{formData?.hall.name}</Text>
            </ImageBackground>

            <View style={styles.datePicker}>
                <Pressable onPress={() => changeDate(-1)} style={styles.arrowPressable}>
                    <Icon name={"arrowLeft"} />
                </Pressable>

                <Pressable
                    onPress={() => setShowPicker(true)}
                    style={[
                        styles.selectedDateContainer,
                        shadowStyles.largeShadow,
                    ]}
                >
                    <Text>
                        {selectedDate && (selectedDate
                                .toLocaleDateString("hr", {
                                    day: "2-digit",
                                    month: "2-digit",
                                })
                                .replace(/\//g, ".") +
                            " " +
                            selectedDate
                                .toLocaleDateString("hr", { weekday: "short" })
                                .toUpperCase())}
                    </Text>
                    <Icon name={"arrowDown"} size={20} />
                </Pressable>

                <Pressable onPress={() => changeDate(1)} style={styles.arrowPressable}>
                    <Icon name={"arrowRight"} />
                </Pressable>
            </View>

            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                />
            )}

            {mockTerrains.map((terrain) => (
                <Pressable
                    key={terrain.id}
                    style={[styles.terrainPreviewContainer, shadowStyles.mediumShadow]}
                    onPress={() => changeFormData("terrain", terrain)}
                >
                    <Text style={[styles.terrainName]}>{terrain.name}</Text>

                    <View style={styles.hoursAndCirclesRow}>
                        {hours.map((hour) => {
                            const reservations = mockReservedTimes.filter(
                                (time) => time.terrainId === terrain.id &&
                                    new Date(time.date).toDateString() ===
                                    selectedDate.toDateString()
                            );

                            let leftHalf = false;
                            let rightHalf = false;

                            reservations.forEach((res) => {
                                const fromHour = parseInt(res.timeFrom.split(":")[0], 10);
                                const fromMin = parseInt(res.timeFrom.split(":")[1], 10);
                                const toHour = parseInt(res.timeTo.split(":")[0], 10);
                                const toMin = parseInt(res.timeTo.split(":")[1], 10);

                                const fromTotalMins = fromHour * 60 + fromMin;
                                const toTotalMins = toHour * 60 + toMin;

                                const halfHourStart = hour * 60;
                                const halfHourMid = hour * 60 + 30;
                                const halfHourEnd = (hour + 1) * 60;

                                if (fromTotalMins < halfHourMid && toTotalMins > halfHourStart) {
                                    leftHalf = true;
                                }

                                if (fromTotalMins < halfHourEnd && toTotalMins > halfHourMid) {
                                    rightHalf = true;
                                }
                            });

                            return (
                                <View key={hour} style={styles.hourColumn}>
                                    <Text style={styles.hourLabel}>{hour}</Text>
                                    <View
                                        style={{
                                            width: 19,
                                            height: 19,
                                            borderRadius: 9,
                                            backgroundColor:
                                                leftHalf && rightHalf ? "#f57e20" : "#e2e2e2",
                                            overflow: "hidden",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            position: "relative",
                                            marginTop: 4,
                                        }}
                                    >
                                        {leftHalf && !rightHalf && (
                                            <View
                                                style={{
                                                    position: "absolute",
                                                    left: 0,
                                                    top: 0,
                                                    width: 9,
                                                    height: 19,
                                                    backgroundColor: "#f57e20",
                                                    borderTopLeftRadius: 9,
                                                    borderBottomLeftRadius: 9,
                                                }}
                                            />
                                        )}
                                        {rightHalf && !leftHalf && (
                                            <View
                                                style={{
                                                    position: "absolute",
                                                    right: 0,
                                                    top: 0,
                                                    width: 9,
                                                    height: 19,
                                                    backgroundColor: "#f57e20",
                                                    borderTopRightRadius: 9,
                                                    borderBottomRightRadius: 9,
                                                }}
                                            />
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 25,
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
    terrainPreviewContainer: {
        backgroundColor: "#fff",
        borderRadius: 9,
        borderWidth: 1,
        padding: 10,
        borderColor: "#f57e20",
    },
    terrainName: {
        fontSize: 16,
        marginBottom: 10,
        color: "#343a40",
    },
    hoursAndCirclesRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    hourColumn: {
        alignItems: "center",
        width: `${100 / 17}%`,
    },
    hourLabel: {
        fontSize: 14,
        textAlign: "center",
    },
    datePicker: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    selectedDateContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 25,
        alignItems: "center",
        gap: 10,
    },
    arrowPressable: {
        padding: 10,
    },
});

export default ReservationTerrainPicker;
