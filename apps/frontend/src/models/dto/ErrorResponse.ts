export default interface ErrorResponse {
    status: number;
    message: string;
    fields: { [key: string]: string };
}