import type { $Fetch, FetchOptions } from 'ofetch'
import { isNil } from 'utils'
import { joinURL } from 'ufo'

export interface FlyapiHandlerOptions extends FetchOptions {
  urlParams?: Record<string, string | number>
  selfCaseTransform?: (str: string) => string
}

export const defaultProxyHandler = <T>(
  _fetchInstance: $Fetch,
  _defaultTransform: (str: string) => string,
  _chunks: string[],
  options: FlyapiHandlerOptions = {}
): Promise<T> => {
  const { selfCaseTransform, urlParams = {}, ...fetchOptions } = options

  const caseTransformedChunks = _chunks.map(item =>
    (isNil(selfCaseTransform) ? _defaultTransform(item) : selfCaseTransform(item)).trim())

  const pathChunks: string[] = []

  for (const chunk of caseTransformedChunks) {
    pathChunks.push(chunk)

    !isNil(urlParams[chunk]) && pathChunks.push(String(urlParams[chunk]))
  }

  const methodPath = joinURL('', ...pathChunks)

  return _fetchInstance(methodPath, fetchOptions)
}
