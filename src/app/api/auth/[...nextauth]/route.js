
import { authOptions } from "@/lib/authOptions"
import NextAuth from "next-auth"


const userList = [
    {name: "hablu", password:"1234"},
    {name: "bablu", password:"8284"},
    {name: "dablu", password:"3231"},
]




const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
