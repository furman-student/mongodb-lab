import { NextResponse } from 'next/server'
import clientPromise from "@/utils/mongodb"

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req?.url)
    const position = searchParams?.get('position')

    const client = await clientPromise
    const db = client.db("education_module")

    const positions = await db
      .collection("positions")
      .find({})
      .toArray()

    let findOptions = {}

    if (position) {
      const currentPosition = positions.find(i => i.value === position)
      if (currentPosition) findOptions = { position: currentPosition._id }
    }

    let users = await db
      .collection("users")
      .find(findOptions, { projection: { password: 0 } })
      .toArray()

    users.forEach(user => {
      const match = positions.find(i => user.position.equals(i._id))
      if (match) user.position = match.name
    })

    return NextResponse.json(users)
  } catch (e) {
    console.error(e)
  }
}
