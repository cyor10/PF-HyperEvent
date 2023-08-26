import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions= {
    
    providers: [         
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
          // Send properties to the client, like an access_token and user id from a provider.
          session.user.username=""
          session.user.user_image=session.user.image
          session.user.last_name=""
          session.user.password=""
          delete session.user.image
          delete session.expires
          return session
        }
      },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions}