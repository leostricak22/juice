
/*const ReservationDatePicker:React.FC<ReservationPickerProps> = ({ changeFormData }) => {
    const { width } = useWindowDimensions();
    const optionWidth = width < 280 ? "90%" : (width < 460 ? "48%" : "32%");

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState();
    const [error, setError] = useState<string>();

    const dateOptions = Array(7).fill(0).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        return date;
    });

    const timeOptions = Array(13).fill(0).map((_, index) => {
        const hour = index + 10;
        return `${hour}:00`;
    });

    const handleDateSelect = (date:any) => {
        if (error) setError("");
        setSelectedDate(date);
    };

    const handleTimeSelect = (time:any) => {
        if (error) setError("");
        setSelectedTime(time);
    };

    const formatDate = (date:any) => {
        return date.toLocaleDateString("hr", {
            day: "numeric",
            month: "numeric",
            weekday: "short"
        });
    };

    const handleSubmit = () => {
        if (!selectedTime || !selectedDate) {
            setError("Odaberite i datum i vrijeme");
            return;
        }

        changeFormData("time", selectedTime);
        changeFormData("date", selectedDate);
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.section}>
                    <Text style={textStyles.headingSmall}>Datum</Text>
                    <View style={styles.optionsContainer}>
                        {dateOptions.map((date, index) => (
                            <TouchableOpacity
                                key={index}

                                style={[
                                    styles.option,
                                    selectedDate && selectedDate.toDateString() === date.toDateString() && styles.selectedOption,
                                    {width: optionWidth}

                                ]}
                                onPress={() => handleDateSelect(date)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    selectedDate && selectedDate.toDateString() === date.toDateString() && styles.selectedOptionText
                                ]}>
                                    {formatDate(date)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <Hr />

                <View style={styles.section}>
                    <Text style={textStyles.headingSmall}>Vrijeme</Text>
                    <View style={styles.optionsContainer}>
                        {timeOptions.map((time, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.option,
                                    selectedTime === time && styles.selectedOption,
                                    {width: optionWidth}
                                ]}
                                onPress={() => handleTimeSelect(time)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    selectedTime === time && styles.selectedOptionText
                                ]}>
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.buttonSection}>
                <ActionButton text={"Next"} color={"orange"} onClick={handleSubmit} />
                <Text style={[textStyles.error, textStyles.alignCenter]}>{error}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
        flexDirection: "column",
        display: "flex",
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
        color: "#343a40",
    },
    optionsContainer: {
        marginTop: 8,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },
    option: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        borderWidth: 1,
        width: "32%",
        alignItems: "center",
    },
    selectedOption: {
        backgroundColor: "rgba(188,98,60,1.00)",
        borderColor: "rgba(188,98,60,1.00)",
    },
    optionText: {
        color: "#212529",
    },
    selectedOptionText: {
        color: "#fff",
        fontWeight: "500",
    },
    buttonSection: {
        flexDirection: "column",
        gap: 8
    }
});

export default ReservationDatePicker;
 */