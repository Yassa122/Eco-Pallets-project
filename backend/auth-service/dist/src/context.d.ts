import { YogaInitialContext } from "graphql-yoga";
import { PrismaClient, User } from "@prisma/client";
export interface Context extends YogaInitialContext {
    prisma: PrismaClient;
    user?: User | Partial<User> | null;
}
export declare const createContext: (initialContext: YogaInitialContext) => Promise<Context>;
export default createContext;
