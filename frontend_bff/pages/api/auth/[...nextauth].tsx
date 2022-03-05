import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    jwt:{
        maxAge: 60 * 3,
    },
    pages:{
        signIn:'/auth/login',
        newUser:'/auth/signup'
    },
    secret:process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            const updatedSession = session.user as Session & {id:string}
            updatedSession.id = user.id;
            return updatedSession;
        }
    }
})
