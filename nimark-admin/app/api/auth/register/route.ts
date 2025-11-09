import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prismadb from "@/lib/prismadb"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    if (password.length < 6) {
      return new NextResponse("Password must be at least 6 characters", { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  } catch (error) {
    console.log("[REGISTER_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
