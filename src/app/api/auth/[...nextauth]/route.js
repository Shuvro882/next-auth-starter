import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";


const userList = [
    {name: "hablu", password:"1234"},
    {name: "bablu", password:"8284"},
    {name: "dablu", password:"3231"},
]


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    
    // ...add more providers here
    CredentialsProvider({
    // "sing in with {name } btutton"
    name: 'Credentials',
    
    //form input

    credentials: {
      email: { label: "Email", type: "email", placeholder: "Enter email" },
      password: { label: "Password", type: "password", placeholder: "password" },
      // secretCode: { label: "Secret Code", type: "number", placeholder:"enter code", },
    },
    async authorize(credentials, req) {
      const {email, password} = credentials;
      
      
      // const user = userList.find((u) => u.name == username);
      const user = await dbConnect("users").findOne({email})
      if(!user) return null;
      
      //match password
      const isPasswordOk = await bcrypt.compare(password, user?.password)

      if(isPasswordOk){
        return user;l
      }
      
      // my own login logic  
      return null
    }
  }),

  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
  ],

  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    return true
  },
  // async redirect({ url, baseUrl }) {
  //   return baseUrl
  // },
  async session({ session, token, user }) {
    if(token){
      session.role = token.role;
    }
    return session
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    if(user){
      token.email=user.email
      token.role=user.role
    }
    return token
  }
}
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
