import { NextAuthConfig } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak"
import Keycloak from "next-auth/providers/keycloak"
export default {
    providers: [
        Keycloak({
            clientId: process.env.KEYCLOAK_ID!,
            clientSecret: process.env.KEYCLOAK_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!,
            authorization: {
                url: `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/auth`,
                params: { scope: "openid profile email" },
            },
            token: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
        }),
    ],
} satisfies NextAuthConfig;