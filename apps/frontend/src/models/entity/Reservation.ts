import Hall from "@/src/models/entity/Hall";
import User from "@/src/models/entity/User";
import Terrain from "@/src/models/entity/Terrain";

export default interface Reservation {
    id: string;
    user: User;
    hall: Hall;
    date: Date;
    timeFrom: string;
    timeTo: string;
    players: User[];
    terrain: Terrain;
    payed: boolean;
}