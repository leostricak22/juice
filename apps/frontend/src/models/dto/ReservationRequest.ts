import Hall from "@/src/models/entity/Hall";

export default interface  ReservationRequest {
    hall: Hall;
    date: Date;
    terrainAndDate: { terrainId:number, timeFrom: string, timeTo: string, date: Date };
    players: any[];
};