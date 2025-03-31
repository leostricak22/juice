import dataFetch from "@/src/utils/DataFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserData = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
        return null;
    }

    let response;
    try {
        response = await dataFetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/user`, "GET");
    } catch (error) {
        return null;
    }

    return response;
}