export default interface User {
    id: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    password?: string;
    registrationType: string;
    active: boolean;
    createdAt: Date;
    role: string;
    location: string;
    profilePicture?: string;
}