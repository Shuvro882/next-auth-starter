import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    
    // ...add more providers here
    CredentialsProvider({
    // "sing in with {name } btutton"
    name: 'Credentials',
    
    //form input

    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      
      // my own login logic  
      return null
    }
  })
  ],
}

export default NextAuth(authOptions)