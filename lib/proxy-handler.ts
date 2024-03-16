import type { $Fetch, FetchOptions } from 'ofetch'
import { isNil } from '../shared/isNil'
import { joinURL } from 'ufo'

export interface FlyapiHandlerOptions extends FetchOptions {
  inlinePathChunks?: Array<string | number>
  selfCaseTransform?: (str: string) => string
}

export const proxyHandler = <T>(
  _prop: string,
  _fetchInstance: $Fetch,
  _defaultTransform: (str: string) => string,
  options: FlyapiHandlerOptions = {}
): Promise<T> => {
  const { inlinePathChunks = [], selfCaseTransform, ...fetchOptions } = options

  const pathChunks = _prop
    .split('_')
    .filter(Boolean)
    .map(item => (isNil(selfCaseTransform) ? _defaultTransform(item) : selfCaseTransform(item)).trim())

  const methodPath = joinURL('', ...pathChunks, ...inlinePathChunks.map(String))

  return _fetchInstance(methodPath, fetchOptions)
}
