import { InMemoryOrgsRepository } from '@/repositories/in-memory'

import { makeOrg } from 'test/factories'
import { FetchNearbyOrgsUseCase } from './fetch-nearby'

describe('Fetch Nearby Orgs Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let fetchNearbyOrgsUseCase: FetchNearbyOrgsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    fetchNearbyOrgsUseCase = new FetchNearbyOrgsUseCase(orgsRepository)
  })

  it('should be able to fetch nearby orgs', async () => {
    const org = await orgsRepository.create(makeOrg())

    const nearbyOrgs = await fetchNearbyOrgsUseCase.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber(),
    })

    expect(nearbyOrgs.orgs).toEqual([org])
  })
})
