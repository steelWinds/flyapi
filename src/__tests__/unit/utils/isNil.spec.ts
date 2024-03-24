import { describe, test, expect } from 'vitest'
import { isNil } from 'src/utils'

describe('IsNil - (null & undefined) checker', () => {
  test('Test with nil values', () => {
    const testCaseTruthy = [
      null,
      undefined,
      // eslint-disable-next-line no-void
      void 0
    ]

    expect(isNil()).toBeTruthy()

    expect(testCaseTruthy.map(isNil)).not.toContain(false)
  })

  test('Test with significant values', () => {
    const testCaseFalsy = [
      true,
      {},
      0,
      ''
    ]

    expect(testCaseFalsy.map(isNil)).not.toContain(true)
  })
})
