import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"



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
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
      secretCode: { label: "Secret Code", type: "number", placeholder:"enter code", },
    },
    async authorize(credentials, req) {
      const {username, password, secretCode} = credentials;
      
      
      const user = userList.find((u) => u.name == username);
      if(!user) return null;

      const isPasswordOk = user.password == password;

      if(isPasswordOk){
        return user;l
      }
      
      // my own login logic  
      return null
    }
  })
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
