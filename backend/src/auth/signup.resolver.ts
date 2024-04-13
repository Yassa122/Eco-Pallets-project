// import { Args, Mutation, Resolver } from "@nestjs/graphql";
// import { KafkaService } from "../services/kafkaService";
// import { PrismaService } from "../services/prismaService";
// import bcrypt from "bcrypt";

// @Resolver()
// export class SignupResolver {
//   constructor(
//     private prismaService: PrismaService,
//     private kafkaService: KafkaService,
//   ) {}

//   @Mutation(() => Boolean)
//   async signup(@Args("input") input: SignupInput): Promise<boolean> {
//     const { email, password, userRole } = input;

//     const existingUser = await this.prismaService.user.findUnique({
//       where: { email },
//     });
//     if (existingUser) {
//       throw new Error("Email already registered.");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await this.prismaService.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         role: userRole,
//       },
//     });

//     await this.kafkaService.publish("user-signup-topic", {
//       userId: user.id,
//       email: user.email,
//     });

//     return true;
//   }
// }
