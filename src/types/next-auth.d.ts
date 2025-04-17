import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            access_token?: string;
            id_token?: string;
        };
        roles?: string[];
    }

    interface JWT {
        decoded?: DecodedToken;
        access_token?: string;
        id_token?: string;
        expires_at?: number;
        refresh_token?: string;
    }
}

interface DecodedToken {
    realm_access?: {
        roles: string[];
    };
    [key: string]: any; // Para otras propiedades que puedan estar presentes
}