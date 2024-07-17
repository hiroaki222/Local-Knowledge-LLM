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
            authorize: async (credentials, req) => {
                const client = ldap.createClient({
                  url: process.env.LDAP_URI,
                });
              
                try {
                  if (credentials) {
                    await new Promise((resolve, reject) => {
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
                    });
                  } else {
                    throw new Error("No credentials provided");
                  }
                } finally {
                    client.unbind((err) => {
                      if (err) {
                        console.error('LDAP unbind error:', err);
                      }
                    });
                  }
              }
        })
    ],
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};