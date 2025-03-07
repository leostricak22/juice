import dataFetch from "@/src/utils/DataFetch";

export const getUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    let response;
    try {
        response = await dataFetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/user`, "GET");
    } catch (error) {
        console.log("Error fetching user data");
        return null;
    }

    return response;
}