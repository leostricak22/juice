import {getUserData} from "@/src/utils/data/UserData";

export const handleUserDataChange = async (setUserData: (data:any) => void) => {
    const userData = await getUserData();
    if (userData) {
        setUserData(userData);
    } else {
        setUserData(null);
    }
}