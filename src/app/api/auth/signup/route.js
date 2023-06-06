import { hash } from "bcryptjs"
import { ObjectId } from "mongodb"
import clientPromise from "@/utils/mongodb"
import { regexPatterns } from "@/utils/const"
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json()

    const { email, username, password } = body

    if (!email || !regexPatterns.get('email').test(email) || !username || !password) {
      return NextResponse.json({ message: 'Invalid Data', status: 422 })
    }

    const client = await clientPromise
    const db = client.db("education_module")

    // check existing user
    const emailExists = await db.collection('users').findOne({ email: email })
    const usernameExists = await db.collection('users').findOne({ username: username })

    if (emailExists || usernameExists) {
      let errorTypes = []
      if (emailExists) errorTypes.push('emailExists')
      if (usernameExists) errorTypes.push('usernameExists')

      return NextResponse.json({ types: errorTypes, status: 422 })
    }

    // hash password
    const hashedPassword = await hash(password, 12)

    // user object to insert
    let userObject = {
      email: email,
      username: username,
      password: hashedPassword,
      fullName: body?.fullName,
      age: body?.age,
      phone: body?.phone,
      userBio: body?.userBio,
    }

    // match position objectID
    if (body?.position) {
      const positions = await db.collection('positions')
      const match = positions.find(position => body?.position.equals(position.slug))
      if (match) userObject.position = new ObjectId(match._id)
    }

    // insert a new user object
    const status = await db.collection('users').insertOne(userObject)

    return NextResponse.json({ message: 'Registered Successfully', ...status })
  } catch (e) {
    console.error(e)
  }
}
