import { NextResponse } from 'next/server'
import clientPromise from "@/utils/mongodb"

export async function GET(req) {
  try {
    const position = req?.nextUrl?.searchParams?.get('position')

    const client = await clientPromise
    const db = client.db("education_module")

    const positions = await db
      .collection("positions")
      .find({})
      .toArray()

    let findOptions = {}

    if (position) {
      const currentPosition = positions.find(i => i.value === position)
      findOptions = { position: currentPosition._id }
    }

    let users = await db
      .collection("users")
      .find(findOptions, { projection: { password: 0 } })
      .toArray()

    users.forEach(user => {
      const match = positions.find(position => user.position.equals(position._id))
      if (match) user.position = match.name
    })

    return NextResponse.json(users)
  } catch (e) {
    console.error(e)
  }
}
