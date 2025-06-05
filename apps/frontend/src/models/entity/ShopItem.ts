import User from "@/src/models/entity/User";

export default interface ShopItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    user: User;
}