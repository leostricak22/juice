import User from "@/src/models/entity/User";
import Hall from "@/src/models/entity/Hall";

export default interface Competition {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    category: string[];
    location: string;
    pricePerPerson: number;
    maxParticipants: number;
    participants: User[];
    hall: Hall;
}