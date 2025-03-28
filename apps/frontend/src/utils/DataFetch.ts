import MessageResponse from "@/src/models/dto/MessageResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function dataFetch<T>(
    url: string,
    method: string,
    data?: any,
): Promise<T | MessageResponse> {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });

    if (!response || !response.status) {
        throw new Error('No HTTP status code received');
    }

    const json = await response.json();
    return json as T;
}