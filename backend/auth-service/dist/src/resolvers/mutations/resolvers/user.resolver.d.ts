import { AuthService } from "../../../services/auth.service";
import { RegisterInput } from "../dto/register.input";
export declare class UserResolver {
    private authService;
    constructor(authService: AuthService);
    login(email: string, password: string, context: any): Promise<string>;
    register(registerInput: RegisterInput): Promise<boolean>;
}
