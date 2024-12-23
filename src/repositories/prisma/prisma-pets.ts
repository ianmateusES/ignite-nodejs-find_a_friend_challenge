import { Pet, Prisma } from '@prisma/client'

import { prismaClient } from '@/lib/prisma'
import { FindAllParams, PetsRepository } from '@/repositories/pets'

export class PrismaPetsRepository implements PetsRepository {
  async findAll(params: FindAllParams): Promise<Pet[]> {
    const pets = await prismaClient.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prismaClient.pet.findUnique({ where: { id } })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prismaClient.pet.create({ data })

    return pet
  }
}
