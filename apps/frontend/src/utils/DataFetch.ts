import MessageResponse from "@/src/models/dto/MessageResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function dataFetch<T>(
    url: string,
    method: string,
    data?: any,
): Promise<T | MessageResponse> {
    let response;

    console.log(url, method, data);
    try {
        response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
    } catch (e) {
        console.error(e);
    }


    if (!response || !response.status) {
        console.log(response);
        throw new Error('No HTTP status code received');
    }

    const json = await response.json();
    return json as T;
}