import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const existing = await prisma.adminUser.count()
  if (existing > 0) {
    console.log('Admin user already exists, skipping.')
    return
  }

  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_INITIAL_PASSWORD

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD in .env to create the first admin user.')
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const user = await prisma.adminUser.create({
    data: { email, name: 'Admin', passwordHash },
  })
  console.log(`Created admin user: ${user.email} (id=${user.id})`)
  console.log('Delete ADMIN_INITIAL_PASSWORD from .env after first login.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
