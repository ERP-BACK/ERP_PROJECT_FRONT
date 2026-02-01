import NextAuth from "next-auth"
import { jwtDecode } from "jwt-decode";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        newUser: '/'
    },
    events: {
        async signOut(message) {
            if ("token" in message && message.token?.id_token) {
                const issuer = process.env.KEYCLOAK_ISSUER!;
                const logoutUrl = `${issuer}/protocol/openid-connect/logout?id_token_hint=${message.token.id_token}`;
                try {
                    await fetch(logoutUrl);
                } catch (e) {
                    console.error("Failed to logout from Keycloak", e);
                }
            }
        },
    },
    callbacks: {
        async jwt({ token, account }) {
            const nowTimeStamp = Math.floor(Date.now() / 1000);
            if (account) {
                const decoded = account.access_token ? jwtDecode<{
                    realm_access?: { roles?: string[] };
                    company_id?: string;
                }>(account.access_token) : null;
                token.decoded = decoded;
                token.accessToken = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                token.company_id = decoded?.company_id;
                return token;
            } else if (nowTimeStamp < (token.expires_at as number)) {
                return token;
            } else {
                console.log("Token expired, refreshing...");
                return token;
            }
        },
        async session({ session, token }) {
            session.user.access_token = token.accessToken as string;
            session.user.id_token = token.id_token as string;
            session.access_token = token.accessToken as string;
            const decodedToken = token.decoded as { realm_access?: { roles?: string[] }; company_id?: string };
            session.roles = decodedToken?.realm_access?.roles || [];
            session.company_id = token.company_id as string;
            return session;
        },
    },
});
