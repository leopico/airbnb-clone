import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "../libs/prismadb";
import { nodeModuleNameResolver } from "typescript";

export async function getSession() {
    return await getServerSession(authOptions)
}


export default async function getCurrentUser() {
    try {
        const session = await getSession();
        
        if (!session?.user?.email) { 
            return null;
        }

        const currentUser = await db.user.findUnique({
            where: {
                email: session.user.email as string //find loggedIn user from users of db
            }
        })

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        }

    } catch (error: any) {
        return null;
    }
}