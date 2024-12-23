import crypto from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'

import { FindAllParams, PetsRepository } from '@/repositories'

import { InMemoryOrgsRepository } from './in-memory-orgs'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private readonly orgsRepository: InMemoryOrgsRepository) {}

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items.filter((item) => {
      const orgMatches = orgsByCity.some((org) => org.id === item.org_id)
      const ageMatches = params.age ? item.age === params.age : true
      const sizeMatches = params.size ? item.size === params.size : true
      const energyLevelMatches = params.energy_level
        ? item.energy_level === params.energy_level
        : true
      const environmentMatches = params.environment
        ? item.environment === params.environment
        : true

      return (
        orgMatches &&
        ageMatches &&
        sizeMatches &&
        energyLevelMatches &&
        environmentMatches
      )
    })

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
    }

    this.items.push(pet)

    return pet
  }
}
