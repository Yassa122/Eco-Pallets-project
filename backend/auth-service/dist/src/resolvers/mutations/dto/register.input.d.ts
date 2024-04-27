import { UserRole } from "./user-rol.enum";
export declare class RegisterInput {
    email: string;
    password: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    company?: string;
    address?: string;
}
