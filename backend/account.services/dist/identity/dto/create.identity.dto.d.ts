export declare class CreateIdentityDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    phoneNumber?: string;
    company?: string;
    address?: string;
    isEmailVerified?: boolean;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}
