import {View} from "react-native";

import dashboardStyles from "@/assets/styles/dashboard"
import DashboardMenuItem from "@/src/components/dashboard/DashboardMenuItem";

const reservationImage = require("@/assets/images/dashboard/reservation.png");
const tournamentImage = require("@/assets/images/dashboard/tournament.png");
const aiTrainerImage = require("@/assets/images/dashboard/ai-trainer.png");
const webshopImage = require("@/assets/images/dashboard/webshop.png");

export default function DashboardMenu() {
    return (
        <View style={dashboardStyles.dashboardMenuContainer}>
            <DashboardMenuItem image={reservationImage} title={"Rezerviraj termin"} redirect={"/reservation"} />
            <DashboardMenuItem image={tournamentImage} title={"Liga i turnir"} redirect={"/"} />
            <DashboardMenuItem image={aiTrainerImage} title={"AI trener"} redirect={"/"} />
            <DashboardMenuItem image={webshopImage} title={"Oglasnik"} redirect={"/"} />
        </View>
    )
}