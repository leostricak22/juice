export default interface RegisterRequest {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    location: string;
    profilePicture?: string;
}