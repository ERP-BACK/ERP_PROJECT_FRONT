// app/api/auth/[...nextauth]/route.ts


// import NextAuth, { NextAuthOptions } from "next-auth";
// import KeycloakProvider from "next-auth/providers/keycloak";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     KeycloakProvider({
//       clientId: process.env.KEYCLOAK_ID!,
//       clientSecret: process.env.KEYCLOAK_SECRET!,
//       issuer: process.env.KEYCLOAK_ISSUER!,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, account }) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.role = account.scope || "user";
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // Asegúrate de haber extendido los tipos en types/next-auth.d.ts
//       session.user.token = token.accessToken as string;
//       session.user.role = token.role as string;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };
// console.log("KEYCLOAK_ID", {
//   clientId: process.env.KEYCLOAK_ID!,
//   clientSecret: process.env.KEYCLOAK_SECRET!,
//   issuer: process.env.KEYCLOAK_ISSUER!,
// });
// // NextAuth en App Router expone GET y POST
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

export const { GET, POST } = handlers
import { handlers } from "@/auth";