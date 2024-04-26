import { PrismaClient, User } from '@prisma/client';
declare const authenticateUser: (prisma: PrismaClient, req: Request) => Promise<User | Partial<User> | null>;
export default authenticateUser;
