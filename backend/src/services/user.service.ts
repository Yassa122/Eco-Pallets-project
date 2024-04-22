import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import * as crypto from "crypto";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    email: string,
    password: string,
    token: string,
  ): Promise<User> {
    // Hash the password
    const hashedPassword = await this.hashPassword(password);

    // Ensure token generation is logging correctly
    console.log("Token generated for user:", token);

    // Create user in the database
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        verificationToken: token,
        isVerified: false,
        role: "USER", // Assuming role is always USER, else make it a parameter
      },
    });
  }

  generateRandomToken(): string {
    // Ensure that the generated token is a string
    return crypto.randomBytes(32).toString("hex");
  }

  private async hashPassword(password: string): Promise<string> {
    // Use bcrypt to hash the password
    return bcrypt.hash(password, 10);
  }
}
