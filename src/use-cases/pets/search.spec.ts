import {
  InMemoryOrgsRepository,
  InMemoryPetsRepository,
} from '@/repositories/in-memory'
import { makeOrg, makePet } from 'test/factories'
import { SearchPetsUseCase } from './search'

describe('Search Pets Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let searchPetsUseCase: SearchPetsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    searchPetsUseCase = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    const org = await orgsRepository.create(makeOrg({ city: 'equal' }))
    await Promise.all([
      petsRepository.create(makePet({ org_id: org.id })),
      petsRepository.create(makePet({ org_id: org.id })),
    ])
    const org2 = await orgsRepository.create(makeOrg({ city: 'different' }))
    await petsRepository.create(makePet({ org_id: org2.id }))

    const { pets } = await searchPetsUseCase.execute({ city: org.city })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await searchPetsUseCase.execute({
      city: org2.city,
    })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and age', async () => {
    const org = await orgsRepository.create(makeOrg())
    await Promise.all([
      petsRepository.create(makePet({ org_id: org.id, age: '1' })),
      petsRepository.create(makePet({ org_id: org.id })),
    ])

    const { pets } = await searchPetsUseCase.execute({
      city: org.city,
      age: '1',
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const org = await orgsRepository.create(makeOrg())
    await Promise.all([
      petsRepository.create(makePet({ org_id: org.id, size: 'small' })),
      petsRepository.create(makePet({ org_id: org.id, size: 'medium' })),
      petsRepository.create(makePet({ org_id: org.id, size: 'large' })),
    ])

    const { pets } = await searchPetsUseCase.execute({
      city: org.city,
      size: 'small',
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and energy_level', async () => {
    const org = await orgsRepository.create(makeOrg())
    await Promise.all([
      petsRepository.create(makePet({ org_id: org.id, energy_level: 'low' })),
      petsRepository.create(
        makePet({ org_id: org.id, energy_level: 'medium' }),
      ),
      petsRepository.create(makePet({ org_id: org.id, energy_level: 'high' })),
    ])

    const { pets } = await searchPetsUseCase.execute({
      city: org.city,
      energy_level: 'low',
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    const org = await orgsRepository.create(makeOrg({ city: 'equal' }))
    await Promise.all([
      petsRepository.create(makePet({ org_id: org.id, environment: 'indoor' })),
      petsRepository.create(
        makePet({ org_id: org.id, environment: 'outdoor' }),
      ),
    ])

    const { pets } = await searchPetsUseCase.execute({
      city: org.city,
      environment: 'indoor',
    })

    expect(pets).toHaveLength(1)
  })
})
