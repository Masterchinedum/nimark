import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding admin user...")

  const adminEmail = "admin@nimark.com"
  const adminPassword = "admin123" // Change this in production!

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existingAdmin) {
    console.log("Admin user already exists")
    
    // Update to ADMIN role if not already
    if (existingAdmin.role !== "ADMIN") {
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: "ADMIN" },
      })
      console.log("Updated existing user to ADMIN role")
    }
    return
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      name: "Admin User",
      hashedPassword,
      role: "ADMIN",
    },
  })

  console.log("Admin user created:", admin.email)
  console.log("Login with:")
  console.log("Email:", adminEmail)
  console.log("Password:", adminPassword)
  console.log("\n⚠️  IMPORTANT: Change the admin password after first login!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
