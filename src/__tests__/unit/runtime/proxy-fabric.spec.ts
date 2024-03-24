import { describe, test, vi, expect, beforeAll } from 'vitest'
import { proxyFabric } from 'src/runtime/proxy-fabric'
import { defaultExecuteHandler } from 'src/runtime/default-execute-handler'
import { faker } from '@faker-js/faker'

beforeAll(() => {
  console.log('Running with seed: ', faker.seed())
})

vi.mock('src/runtime/default-execute-handler', async (importOriginal) => {
  const mod = await importOriginal() as any

  return {
    ...mod,
    defaultExecuteHandler: vi.fn((_, __, chunks) => chunks)
  }
})

describe('Proxy fabric tests', () => {
  test('Test of default execute handler', () => {
    const proxyFabricMockWith = proxyFabric({
      fetchOptions: {
        baseURL: 'https://someapiurl'
      }
    })

    const [w1, w2, w3] = faker.word.words(3).split(' ')

    void proxyFabricMockWith[w1][w2][w3].exec()

    expect((defaultExecuteHandler as any).mock.results?.[0].value).toStrictEqual([w1, w2, w3])
  })

  const executeHandlerMock = vi.fn((_, __, chunks) => chunks)

  const proxyFabricMock = proxyFabric({ fetchOptions: { baseURL: 'https://someapiurl' }, executeHandler: executeHandlerMock })

  test('Test of proxy context', () => {
    const [w1, w2, w3] = faker.word.words(3).split(' ')

    void proxyFabricMock[w1]
    void proxyFabricMock[w1][w2]
    void proxyFabricMock[w1][w2][w3].exec()

    expect(executeHandlerMock.mock.results?.[0].value).toStrictEqual([w1, w2, w3])
  })

  test('Test of symbol path', () => {
    // For test case where we use hack
    const symbol = Symbol('random') as any as string

    expect(() => proxyFabricMock[symbol].exec()).toThrowError('Properties must be a string')
  })

  test('Test of instance level case transform', () => {
    const executeHandlerMock = vi.fn((_, caseTransform, chunks) => chunks.map(caseTransform))

    const caseTransform = (str: string): string => `|_(_|${str}|_)_|`

    const proxyFabricMockWith = proxyFabric({
      fetchOptions: {
        baseURL: 'https://someapiurl'
      },
      caseTransform,
      executeHandler: executeHandlerMock
    })

    const [w1, w2, w3] = faker.word.words(3).split(' ')

    void proxyFabricMockWith[w1][w2][w3].exec()

    expect(executeHandlerMock.mock.results?.[0].value).toStrictEqual([`|_(_|${w1}|_)_|`, `|_(_|${w2}|_)_|`, `|_(_|${w3}|_)_|`])
  })
})
