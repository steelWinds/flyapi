import { describe, test, expect } from 'vitest'
import { isNil } from 'src/utils'

describe('IsNil - (null & undefined) checker', () => {
  test('Test with nil values', () => {
    expect(isNil()).toBeTruthy()
    expect(isNil(null)).toBeTruthy()
    expect(isNil(undefined)).toBeTruthy()
    // eslint-disable-next-line no-void
    expect(isNil(void 0)).toBeTruthy()
  })

  test('Test with significant values', () => {
    expect(isNil(true)).toBeFalsy()
    expect(isNil({})).toBeFalsy()
    expect(isNil(1)).toBeFalsy()
    expect(isNil('')).toBeFalsy()
  })
})
