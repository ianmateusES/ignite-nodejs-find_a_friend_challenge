import { PrismaClient } from '@prisma/client'

let prismaClient: PrismaClient

export function initializePrismaClient() {
  prismaClient = new PrismaClient({
    log: ['warn', 'error'],
  })
}

export { prismaClient }
