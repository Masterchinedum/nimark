import { handlers } from "@/auth" 


export const { GET, POST } = handlers
// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       // Configure your auth provider here
//       name: 'Credentials',
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials, req) {
//         // Add your authentication logic here
//         // Return null if user data could not be retrieved
//         return null
//       }
//     })
//   ],
// })

// export { handler as GET, handler as POST }