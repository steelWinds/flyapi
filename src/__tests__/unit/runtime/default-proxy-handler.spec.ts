import { describe, test, vi, expect } from 'vitest'
import { defaultProxyHandler } from 'src/runtime/default-proxy-handler'
import { type $Fetch } from 'ofetch'

describe('Default proxy handler tests', () => {
  const _fetch = vi.fn().mockImplementation((path) => path)
  const proxyHandler = defaultProxyHandler.bind(null, _fetch as any as $Fetch, (str) => str)

  test('Default string build', () => {
    void proxyHandler(['one', 'two', 'three'], {})

    expect(_fetch.mock.lastCall[0]).toBe('one/two/three')
  })

  test('With case transform string build', () => {
    void proxyHandler(['one', 'two', 'three'], { selfCaseTransform: (str) => `|_${str}_|` })

    expect(_fetch.mock.lastCall[0]).toBe('|_one_|/|_two_|/|_three_|')
  })

  test('With URL params, without case transform', () => {
    void proxyHandler(['one', 'two', 'three'], {
      urlParams: {
        one: 1,
        two: 'myparam',
        three: 2 + 2
      }
    })

    expect(_fetch.mock.lastCall[0]).toBe('one/1/two/myparam/three/4')
  })

  test('With URL params, with case transform', () => {
    void proxyHandler(['one', 'two', 'three'], {
      urlParams: {
        one: 1,
        two: 'myparam',
        three: 2 + 2
      },
      selfCaseTransform: (str) => `|_${str}_|`
    })

    expect(_fetch.mock.lastCall[0]).toBe('|_one_|/1/|_two_|/myparam/|_three_|/4')
  })
})
