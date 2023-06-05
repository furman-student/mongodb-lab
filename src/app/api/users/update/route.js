import { hash } from "bcryptjs"
import { NextResponse } from 'next/server'
import clientPromise from "@/utils/mongodb"

export async function PUT(req) {
  try {
    const body = await req.json()

    const client = await clientPromise
    const db = client.db("education_module")

    const hashedPassword = await hash(body.password, 12)

    const status = await db.collection("users").updateOne(
      { "username": body.username },
      { $set: { "password": hashedPassword } },
    )

    return NextResponse.json({ message: 'Successfully updated', ...status })
  } catch (e) {
    console.error(e)
  }
}
