import ErrorResponse from "@/src/models/dto/ErrorResponse";

export const isValidMessageResponse = (response: any) => {
    return !(Object.keys(response).length === 1 && "message" in response);
}

export const isResponseError = (response: any) => {
    return response && (response as ErrorResponse).status && (response as ErrorResponse).status >= 300
}