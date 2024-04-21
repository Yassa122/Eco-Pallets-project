import { InputType, Field } from "@nestjs/graphql";
import { UserRole } from "./user-rol.enum"; // Assuming UserRole enum is also defined in GraphQL

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field() 
  password: string;

  @Field(() => UserRole, { defaultValue: UserRole.USER })
  role: UserRole;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  address?: string;

  // Fields like `isActive`, `verified` might not be appropriate to expose to user input during registration
  // Typically, fields like `resetToken`, `verifyToken`, etc., are not directly set during registration and are handled internally
}
