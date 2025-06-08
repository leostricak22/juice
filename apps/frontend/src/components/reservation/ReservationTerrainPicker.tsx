import ReservationPickerProps from "@/src/types/ReservationPickerProps";
import React, {useState} from "react";
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Platform,
    Pressable, TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import shadowStyles from "@/assets/styles/shadow";
import Icon from "@/src/components/icon/Icon";
import ActionButton from "@/src/components/button/ActionButton";
import {Portal} from "react-native-portalize";

const mockTerrains = [
    {id: "68446a023bc1be235888c264", name: "Terra 1"},
    {id: "68446a133bc1be235888c266", name: "Terra 2"},
    {id: "68446a213bc1be235888c268", name: "Terra 3"},
    {id: "68446a2f3bc1be235888c26a", name: "Terra 4"},
];

const mockReservedTimes = [
    {terrainId: "68446a023bc1be235888c264", timeFrom: "10:00", timeTo: "11:30", date: Date.now()},
    {terrainId: "68446a023bc1be235888c264", timeFrom: "11:30", timeTo: "12:30", date: Date.now()},
    {terrainId: "68446a023bc1be235888c264", timeFrom: "13:00", timeTo: "14:00", date: Date.now()},
    {terrainId: "68446a133bc1be235888c266", timeFrom: "12:00", timeTo: "13:30", date: Date.now()},
    {terrainId: "68446a133bc1be235888c266", timeFrom: "14:00", timeTo: "15:00", date: Date.now()},
    {terrainId: "68446a213bc1be235888c268", timeFrom: "16:00", timeTo: "17:00", date: Date.now()},
    {terrainId: "68446a213bc1be235888c268", timeFrom: "14:00", timeTo: "15:30", date: Date.now()},
    {terrainId: "68446a213bc1be235888c268", timeFrom: "16:00", timeTo: "17:30", date: Date.now()},
    {terrainId: "68446a2f3bc1be235888c26a", timeFrom: "09:30", timeTo: "11:00", date: Date.now()},
    {terrainId: "68446a2f3bc1be235888c26a", timeFrom: "12:00", timeTo: "13:00", date: Date.now()},
    {terrainId: "68446a2f3bc1be235888c26a", timeFrom: "15:00", timeTo: "16:30", date: Date.now()},
];

const ReservationTerrainPicker: React.FC<ReservationPickerProps> = ({
                                                                        changeFormData,
                                                                        formData,
                                                                    }) => {
    const [selectedTerrainId, setSelectedTerrainId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [userReservations, setUserReservations] = useState<{
        [key: string]: boolean;
    }>({});
    const [hoveredTerrainContainers, setHoveredTerrainContainers] = useState<string | null>(null);

    const hours = Array.from({length: 17}, (_, i) => 7 + i);

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
                source={formData?.hall?.image ? {uri: formData.hall.image} : require("@/assets/images/no-image.jpg")}
                resizeMode="cover"
                style={styles.imageBackground}
                imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
            >
                <Text style={styles.text}>{formData?.hall.name}</Text>
            </ImageBackground>

            <View style={styles.datePicker}>
                <TouchableOpacity onPress={() => changeDate(-1)} style={styles.arrowPressable}>
                    <Icon name={"arrowLeft"}/>
                </TouchableOpacity>

                <TouchableOpacity
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
                                .toLocaleDateString("hr", {weekday: "short"})
                                .toUpperCase())}
                    </Text>
                    <Icon name={"arrowDown"} size={20}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => changeDate(1)} style={styles.arrowPressable}>
                    <Icon name={"arrowRight"}/>
                </TouchableOpacity>
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

            <View style={styles.legendContainer}>
                <View style={styles.legend}>
                    <Text>Slobodno</Text>
                    <View
                        style={{
                            width: 19,
                            height: 19,
                            borderRadius: 9,
                            backgroundColor: "#e2e2e2",
                            overflow: "hidden",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            marginTop: 4,
                        }}
                    />
                </View>
                <View style={styles.legend}>
                    <Text>Zauzeto</Text>
                    <View
                        style={{
                            width: 19,
                            height: 19,
                            borderRadius: 9,
                            backgroundColor: "#f57e20",
                            overflow: "hidden",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            marginTop: 4,
                        }}
                    />
                </View>
            </View>

            {mockTerrains.map((terrain) => (
                <React.Fragment key={terrain.id + "fragment"}>
                    <Pressable
                        key={terrain.id}
                        style={[
                            styles.terrainPreviewContainer,
                            shadowStyles.mediumShadow,
                            hoveredTerrainContainers === terrain.id ? {backgroundColor: "#f5f5f5"} : {}
                        ]}
                        onPress={() => {
                            if (selectedTerrainId === terrain.id) {
                                setSelectedTerrainId(null);
                            } else {
                                setSelectedTerrainId(terrain.id);
                            }
                        }}
                        {...(Platform.OS === "web"
                            ? {
                                onMouseEnter: () => setHoveredTerrainContainers(terrain.id),
                                onMouseLeave: () => setHoveredTerrainContainers(null),
                            }
                            : {
                                onPressIn: () => setHoveredTerrainContainers(terrain.id),
                                onPressOut: () => setHoveredTerrainContainers(null),
                            })}
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
                    {
                        selectedTerrainId && selectedTerrainId === terrain.id && (
                            <View key={terrain.id + "selected"}>
                                {(() => {
                                    const times: string[] = [];
                                    for (let hour = 7; hour < 24; hour++) {
                                        times.push(`${hour.toString().padStart(2, "0")}:00`);
                                        times.push(`${hour.toString().padStart(2, "0")}:30`);
                                    }

                                    return (
                                        <>
                                            {times.map((time, idx) => {
                                                const isReserved = mockReservedTimes.some(
                                                    (reservation: any) =>
                                                        reservation.terrainId === terrain.id &&
                                                        time >= reservation.timeFrom && time < reservation.timeTo &&
                                                        new Date(reservation.date).toDateString() === selectedDate.toDateString()
                                                );

                                                const isUserReserved = userReservations[`${terrain.id}_${time}`];

                                                return (
                                                    <View
                                                        key={time + idx}
                                                        style={[
                                                            styles.selectableTimeSpanContainer,
                                                            isReserved && {backgroundColor: "#e2e2e2"},
                                                            isUserReserved && {
                                                                backgroundColor: "#f57e20",
                                                                borderColor: "#f57e20"
                                                            },
                                                        ]}
                                                    >
                                                        <View style={styles.selectableTimeSpanTimesContainer}>
                                                            <Text style={styles.selectableTimeSpanTimes}>{time}</Text>
                                                            <Text style={styles.selectableTimeSpanTimes}>
                                                                {(() => {
                                                                    const [h, m] = time.split(":").map(Number);
                                                                    const date = new Date();
                                                                    date.setHours(h, m + 30, 0, 0);
                                                                    return date.toTimeString().slice(0, 5);
                                                                })()}
                                                            </Text>
                                                        </View>
                                                        {(() => {
                                                                const key = `${terrain.id}_${time}`;
                                                                const isUserReserved = userReservations[key];

                                                                if (isReserved && !isUserReserved) {
                                                                    return <Text
                                                                        key={key}
                                                                        style={styles.reservedText}>Rezervirano</Text>;
                                                                }

                                                                return !isUserReserved ? (
                                                                    <View
                                                                        style={{
                                                                            width: 120,
                                                                            height: "100%",
                                                                            justifyContent: "center",
                                                                            marginRight: 10,
                                                                        }}
                                                                    >
                                                                        <ActionButton
                                                                            text={"Rezerviraj"}
                                                                            color={"transparent"}
                                                                            onClick={() => {
                                                                                setUserReservations((prev) => {
                                                                                    const updated = {...prev};
                                                                                    updated[key] = true;
                                                                                    return updated;
                                                                                });
                                                                            }}
                                                                        />
                                                                    </View>
                                                                ) : (
                                                                    <Pressable
                                                                        style={{alignSelf: "center", marginRight: 20}}
                                                                        onPress={() => {
                                                                            setUserReservations((prev) => {
                                                                                const updated = {...prev};
                                                                                delete updated[key];
                                                                                return updated;
                                                                            });
                                                                        }}
                                                                    >
                                                                        <Icon name={"close"}/>
                                                                    </Pressable>
                                                                );
                                                            }
                                                        )()
                                                        }
                                                    </View>
                                                );
                                            })}
                                        </>
                                    );
                                })()}
                            </View>
                        )
                    }
                </React.Fragment>
            ))}
            {selectedTerrainId && (
                <Portal>
                    <View style={[styles.popupContainer, shadowStyles.largeShadow]}>
                        <ActionButton
                            text="Dalje"
                            color="black"
                            onClick={() => {
                                changeFormData("terrainAndDate", {
                                    terrainId: selectedTerrainId,
                                    timeFrom: Object.keys(userReservations)
                                        .filter(key => key.startsWith(`${selectedTerrainId}_`) && userReservations[key])
                                        .map(key => key.split('_')[1])
                                        .sort((a, b) => a.localeCompare(b))[0],
                                    timeTo: Object.keys(userReservations)
                                        .filter(key => key.startsWith(`${selectedTerrainId}_`) && userReservations[key])
                                        .map(key => key.split('_')[1])
                                        .sort((a, b) => a.localeCompare(b))[Object.keys(userReservations).length - 1]
                                        ? (() => {
                                            const lastTime = Object.keys(userReservations)
                                                .filter(key => key.startsWith(`${selectedTerrainId}_`) && userReservations[key])
                                                .map(key => key.split('_')[1])
                                                .sort((a, b) => a.localeCompare(b))[Object.keys(userReservations).length - 1];
                                            if (!lastTime) return undefined;
                                            const [h, m] = lastTime.split(":").map(Number);
                                            const date = new Date();
                                            date.setHours(h, m + 30, 0, 0);
                                            return date.toTimeString().slice(0, 5);
                                        })()
                                        : undefined,
                                    date: selectedDate,
                                });
                            }}
                        />
                    </View>
                </Portal>
            )}
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
        paddingHorizontal: 25,
        borderRadius: 25,
        height: 44,
        alignItems: "center",
        gap: 10,
    },
    arrowPressable: {
        padding: 10,
    },
    legendContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10,
        gap: 35
    },
    legend: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    selectableTimeSpanContainer: {
        width: "100%",
        height: 56,
        borderTopWidth: 2,
        borderColor: "#d9d9d9",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    selectableTimeSpanTimesContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        height: "100%",
    },
    selectableTimeSpanTimes: {
        fontSize: 20,
        fontFamily: "Roboto"
    },
    reservedText: {
        fontSize: 20,
        paddingRight: 16,
        alignSelf: "center",
    },
    popupContainer: {
        position: "absolute",
        bottom: -10,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: "center",
        backgroundColor: "white",
        borderTopWidth: 2,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 15,
        borderColor: "#d9d9d9",
    },
});

export default ReservationTerrainPicker;
