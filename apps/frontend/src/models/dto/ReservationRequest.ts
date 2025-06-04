import Hall from "@/src/models/entity/Hall";
import User from "@/src/models/entity/User";

export default interface  ReservationRequest {
    hall: Hall;
    date: Date;
    terrainAndDate: { terrainId:number, timeFrom: string, timeTo: string, date: Date };
    players: User[];
};