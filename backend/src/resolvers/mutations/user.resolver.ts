import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "../../services/auth.service";

@Resolver()
export class UserResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
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

  @Mutation(() => String)
  async register(
    @Args("registerInput") registerInput: any,
  ): Promise<{ access_token: string }> {
    return this.authService.register(registerInput);
  }

  // Additional mutations like resetPassword can be added here following a similar pattern
}
