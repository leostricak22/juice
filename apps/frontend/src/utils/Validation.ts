export const isValidMessageResponse = (response: any) => {
    return !(Object.keys(response).length === 1 && "message" in response);
}