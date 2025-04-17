import NextAuth from "next-auth"
import { jwtDecode } from "jwt-decode";
import authConfig from "@/auth.config";
import { encrypt } from "@/util/encryption";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        //  signOut: "/auth/signout",
        error: "/auth/error", // Error code passed in query string as ?error=
        verifyRequest: "/auth/verify-request", // (used for check email message)
        newUser: '/' // Will disable the new account creation screen if set to false
    },
    callbacks: {
        async jwt({ token, account }) {
            const nowTimeStamp = Math.floor(Date.now() / 1000);
            if (account) {
                token.decoded = account.access_token ? jwtDecode(account.access_token) : null;
                token.accessToken = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                return token;
            } else if (nowTimeStamp < (token.expires_at as number)) {
                return token;
            } else {
                console.log("Token expired, refreshing...");
                return token;
            }

        },
        async session({ session, token }) {
            session.user.access_token = token.access_token as string;
            session.user.id_token = token.id_token as string;
            const decodedToken = token.decoded as { realm_access?: { roles?: string[] } };
            session.roles = decodedToken.realm_access?.roles || [];
            return session;
        },
    },
    //  secret: process.env.AUTH_SECRET,
});



