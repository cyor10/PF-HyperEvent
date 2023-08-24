import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const { v4: uuidv4 } = require('uuid');
const authOptions= {
    
    providers: [         
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
          // Send properties to the client, like an access_token and user id from a provider.
          session.user.id = uuidv4()
          session.user.last_name=""
          session.user.user_image=session.user.image
          session.user.username=""
          return session
        }
      },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions}