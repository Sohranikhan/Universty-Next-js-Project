import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch("https://mcut.vercel.app/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();
        if (user.success) {
          return user.user; // Return user object if authentication is successful
        } else {
          return null; // Return null if authentication fails
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/api/auth/error',
  },
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        token.user = user; 
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
      session.user = token  
      }
  return session;
},
},
session:{
  strategy: 'jwt',
},
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET
};
