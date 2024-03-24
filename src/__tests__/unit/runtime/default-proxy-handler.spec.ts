import { type $Fetch } from 'ofetch'
import { describe, test, vi, expect, beforeAll } from 'vitest'
import { defaultExecuteHandler } from 'src/runtime/default-execute-handler'
import { faker } from '@faker-js/faker'

beforeAll(() => {
  console.log('Running with seed: ', faker.seed())
})

describe('Default proxy handler tests', () => {
  test('Test of default case transform', () => {
    const fetchMock = vi.fn((path) => path)
    const caseTransform = (str: string): string => `|_(_|${str}|_)_|`
    const executeHandlerMock = defaultExecuteHandler.bind(null, fetchMock as any as $Fetch, caseTransform)

    const [w1, w2, w3] = faker.word.words(3).split(' ')

    void executeHandlerMock([w1, w2, w3], { caseTransform })

    expect(fetchMock.mock.lastCall?.[0]).toBe(`|_(_|${w1}|_)_|/|_(_|${w2}|_)_|/|_(_|${w3}|_)_|`)
  })

  const fetchMock = vi.fn((path) => path)
  const executeHandlerMock = defaultExecuteHandler.bind(null, fetchMock as any as $Fetch, undefined)

  test('Default string building', () => {
    const [w1, w2, w3] = faker.word.words(3).split(' ')

    void executeHandlerMock([w1, w2, w3])

    expect(fetchMock.mock.lastCall?.[0]).toBe(`${w1}/${w2}/${w3}`)
  })

  test('With self case transform', () => {
    const [w1, w2, w3] = faker.word.words(3).split(' ')

    const caseTransform = (str: string): string => `|_(_|${str}|_)_|`

    void executeHandlerMock([w1, w2, w3], { caseTransform })

    expect(fetchMock.mock.lastCall?.[0]).toBe(`|_(_|${w1}|_)_|/|_(_|${w2}|_)_|/|_(_|${w3}|_)_|`)
  })

  test('With URL params, without self case transform', () => {
    const [w1, w2, w3] = faker.word.words(3).split(' ')
    const urlParams = {
      [w1]: faker.string.alphanumeric(5),
      [w2]: faker.string.alphanumeric(10),
      [w3]: faker.string.alphanumeric(15)
    }

    void executeHandlerMock([w1, w2, w3], { urlParams })

    expect(fetchMock.mock.lastCall?.[0]).toBe(`${w1}/${urlParams[w1]}/${w2}/${urlParams[w2]}/${w3}/${urlParams[w3]}`)
  })

  test('With URL params, with self case transform', () => {
    const [w1, w2, w3] = faker.word.words(3).split(' ')
    const urlParams = {
      [w1]: faker.string.alphanumeric(5),
      [w2]: faker.string.alphanumeric(10),
      [w3]: faker.string.alphanumeric(15)
    }
    const caseTransform = (str: string): string => `|_(_|${str}|_)_|`

    void executeHandlerMock([w1, w2, w3], { urlParams, caseTransform })

    expect(fetchMock.mock.lastCall?.[0]).toBe(`|_(_|${w1}|_)_|/${urlParams[w1]}/|_(_|${w2}|_)_|/${urlParams[w2]}/|_(_|${w3}|_)_|/${urlParams[w3]}`)
  })
})
