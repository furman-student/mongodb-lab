import NextAuth from 'next-auth'
import { compare } from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import clientPromise from "@/utils/mongodb"

const handler = NextAuth({
  //Configure JWT
  session: { jwt: true },

  //Specify Provider
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await clientPromise
        const db = client.db("education_module")

        //Find user with the email
        const user = await db
          .collection('users')
          .findOne({
            $or: [
              { email: credentials.username },
              { username: credentials.username },
            ]
          })

        //Not found - send error res
        if (!user) {
          throw new Error('No user found with the username/email')
        }

        //Check hashed password with DB password
        const checkPassword = await compare(credentials.password, user.password)
        //Incorrect password - send response
        if (!checkPassword) {
          throw new Error('Password doesnt match')
        }

        return { name: user.fullName, email: user.email }
      },
    }),
  ],

  secret: process.env.SECRET
})

export { handler as GET, handler as POST }
