import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` in development to persist across module reloads
  var prisma: PrismaClient | undefined
}

const client: PrismaClient = global.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = client

export default client
