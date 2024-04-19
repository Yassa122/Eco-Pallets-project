import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "./prisma.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    public prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: any): Promise<boolean> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userDto.password, salt);

      await this.prisma.user.create({
        data: {
          ...userDto,
          password: hashedPassword,
        },
      });
      return true; // Return true if registration is successful
    } catch (error) {
      console.error("Registration failed:", error);
      return false; // Return false if registration fails
    }
  }
}
export default AuthService;
