import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prismaService"; // Handle DB interactions
import { KafkaService } from "./kafkaService"; // Handle Kafka interactions
import bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";

@Injectable()
export class SignupService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
  ) {}

  async registerUser(userData: {
    email: string;
    password: string;
    role: UserRole;
  }): Promise<boolean> {
    const { email, password, role } = userData;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    try {
      if (existingUser) {
        throw new Error("User already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role, // Assuming the schema has 'role' field
        },
      });

      await this.kafka.publish("user-created", [{ userId: user.id }]);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Failed to register user.");
    }
  }
}
export default SignupService;
