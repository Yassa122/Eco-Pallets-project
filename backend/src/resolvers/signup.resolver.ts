// // signup.resolver.ts
// import { Args, Mutation, Resolver } from "@nestjs/graphql";
// import { KafkaService } from "../kafka/kafka.service"; // Assuming you have a KafkaService

// @Resolver()
// export class SignupResolver {
//   constructor(
//     private kafkaService: KafkaService, // Inject Kafka service
//     private userService: UserService, // Inject user service
//   ) {}

//   @Mutation((returns) => UserResponse)
//   async signup(
//     @Args("email") email: string,
//     @Args("password") password: string,
//     @Args("firstName") firstName: string,
//     @Args("lastName") lastName: string,
//   ): Promise<UserResponse> {
//     // Register user in the database
//     const user = await this.userService.createUser({
//       email,
//       password,
//       firstName,
//       lastName,
//     });

//     // Publish an event to Kafka for asynchronous processing (e.g., sending an email)
//     await this.kafkaService.publish("user-signup-topic", {
//       userId: user.id,
//       email: user.email,
//     });

//     // Return response
//     return {
//       id: user.id,
//       email: user.email,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       message:
//         "Signup successful! Please check your email to verify your account.",

//     };  
//   }
// }
