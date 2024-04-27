import { PrismaService } from "../../prisma/prisma.service";
import { User } from "@prisma/client";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(email: string, password: string, token: string): Promise<User>;
    generateRandomToken(): string;
    private hashPassword;
}
