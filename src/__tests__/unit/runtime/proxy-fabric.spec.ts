import { describe, test, vi, expect } from 'vitest'
import { proxyFabric, type Group } from 'src/runtime/proxy-fabric'

describe('Proxy fabric tests', () => {
  const executeHandlerMock = vi.fn((_, __, chunks) => chunks)

  interface MockApi {
    one: Group<{
      two: number
      three: Group<{
        four: number
      }>
    }>
    three: number
  }

  const proxyFabricMock = proxyFabric<MockApi>({ fetchOptions: { baseURL: 'https://someapiurl' }, executeHandler: executeHandlerMock })

  test('Test of proxy context', () => {
    void proxyFabricMock.one
    void proxyFabricMock.one.two.exec()

    expect(executeHandlerMock.mock.results?.[0].value).toStrictEqual(['one', 'two'])

    void proxyFabricMock.one.three
    void proxyFabricMock.one.three.four.exec()

    expect(executeHandlerMock.mock.results?.[1].value).toStrictEqual(['one', 'three', 'four'])

    void proxyFabricMock.one.three
    void proxyFabricMock.three.exec()

    expect(executeHandlerMock.mock.results?.[2].value).toStrictEqual(['three'])
  })
})
