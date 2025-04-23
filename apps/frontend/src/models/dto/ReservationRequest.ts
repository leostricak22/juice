import Hall from "@/src/models/entity/Hall";

export default interface  ReservationRequest {
    hall: Hall;
    date: Date;
    time: string;
};