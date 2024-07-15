import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import ldap from "ldapjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "login",
            id: "login",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            type: "credentials",
            authorize: async (credentials, req) => {
                const client = ldap.createClient({
                    url: process.env.LDAP_URI,
                });

                return new Promise((resolve, reject) => {
                    if (credentials) {
                        client.bind(credentials.email, credentials.password, (error) => {
                            if (error) {
                                console.error("Failed to authenticate via LDAP");
                                reject(new Error("Invalid credentials"));
                            } else {
                                console.log("Successfully authenticated via LDAP");
                                resolve({
                                    id: "id",
                                    name: "name",
                                    email: credentials.email,
                                    image: "image",
                                });
                            }
                        });
                    } else {
                        reject(new Error("No credentials provided"));
                    }
                });
            },
        })
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
