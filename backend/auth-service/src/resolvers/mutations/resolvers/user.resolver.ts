import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "../../../services/auth.service";
import { RegisterInput } from "../dto/register.input";
import * as dotenv from "dotenv";

dotenv.config(); // Make sure this is at the top to load environment variables early

@Resolver()
export class UserResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args("email") email: string,
    @Args("password") password: string,
    @Context() context: any,
  ): Promise<string> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const { access_token } = await this.authService.login(user);

    // Set cookie with the JWT token
    context.res.cookie("jwt", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    return access_token; // Directly return the string token
  }

  @Mutation(() => Boolean) // Changed return type to Boolean
  async register(
    @Args("registerInput") registerInput: RegisterInput,
  ): Promise<boolean> {
    // Updated Promise type
    return this.authService.register(registerInput);
  }
}
