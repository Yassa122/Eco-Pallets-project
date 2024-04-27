import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
export declare class AuthService {
    prisma: PrismaService;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(userDto: any): Promise<boolean>;
}
export default AuthService;
