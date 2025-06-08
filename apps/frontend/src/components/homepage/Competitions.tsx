import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import Competition from "@/src/models/entity/Competition";
import User from "@/src/models/entity/User";
import Icon from "@/src/components/icon/Icon";

import textStyles from "@/assets/styles/text";
import shadowStyles from "@/assets/styles/shadow";
import {useRouter} from "expo-router";

const mockCompetitionData: Competition[] = [
    {
        id: "1",
        name: "Padel Pause by NOX",
        description: "A competition.",
        startDate: new Date("2025-07-29"),
        endDate: new Date("2025-07-31"),
        category: ["rang 1", "rang 3", "žene"],
        location: "Padel Embassy",
        pricePerPerson: 30,
        maxParticipants: 64,
        hall: null,
        participants: [
            {} as User,
            {} as User,
            {} as User,
            {} as User,
            {} as User,
            {} as User,
            {} as User,
            {} as User
        ]
    }
]

const Competitions: React.FC = () => {
    const router = useRouter();

    return (
        <View>
            {
                mockCompetitionData.map((competition: Competition) => (
                    <TouchableOpacity key={competition.id} style={styles.competitionContainer}
                                      onPress={() => router.push(`/competitions/${competition.id.toString()}`)}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 20
                        }}>
                            <Text style={textStyles.headingSmall}>{competition.name}</Text>
                            <Text style={textStyles.headingSmallNoBold}>
                                {competition.startDate.toLocaleDateString("hr-HR", {
                                    day: "2-digit",
                                    month: "2-digit"
                                }).replace(/\s/g, "")} - {competition.endDate.toLocaleDateString("hr-HR", {
                                day: "2-digit",
                                month: "2-digit"
                            }).replace(/\s/g, "")}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon name={"location"}/>
                                <Text
                                    style={[textStyles.headingSmallNoBold, {marginLeft: 8}]}>{competition.location}</Text>
                            </View>
                            <View>
                                <Text
                                    style={textStyles.headingSmallNoBold}>{competition.participants.length}/{competition.maxParticipants}</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={textStyles.headingSmallNoBold}>Kategorije</Text>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                {
                                    competition.category.map((cat, index) => (
                                        <Text style={{marginLeft: 8, width: "100%"}} key={index}>• {cat}</Text>
                                    ))
                                }
                            </View>
                        </View>

                        <Text style={[textStyles.headingSmall, {
                            position: "absolute",
                            right: 15,
                            bottom: 15
                        }]}>{competition.pricePerPerson}€ po osobi</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
}

export default Competitions;

const styles = {
    competitionContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: "#F57E20",
        borderWidth: 1,
        ...shadowStyles.smallShadow,
    },
};