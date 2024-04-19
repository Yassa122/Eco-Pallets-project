import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "../../services/auth.service";
import { RegisterInput } from "./dto/register.input";

@Resolver()
export class UserResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String) // Keep as String if you return a token or adjust as needed
  async login(
    @Args("email") email: string,
    @Args("password") password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return this.authService.login(user);
  }

  @Mutation(() => Boolean) // Changed return type to Boolean
  async register(
    @Args("registerInput") registerInput: RegisterInput,
  ): Promise<boolean> {
    // Updated Promise type
    return this.authService.register(registerInput);
  }
}
