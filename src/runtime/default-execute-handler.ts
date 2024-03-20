import type { $Fetch, FetchOptions } from 'ofetch'
import { isNil } from 'src/utils'
import { joinURL } from 'ufo'

export interface FlyapiHandlerOptions extends FetchOptions {
  urlParams?: Record<string, string | number>
  selfCaseTransform?: (str: string) => string
}

export const defaultExecuteHandler = <T>(
  _fetchInstance: $Fetch,
  _defaultTransform: (str: string) => string,
  chunks: string[],
  options: FlyapiHandlerOptions = {}
): Promise<T> => {
  const { selfCaseTransform, urlParams = {}, ...fetchOptions } = options

  const pathChunks: string[] = []

  for (const chunk of chunks) {
    pathChunks.push((isNil(selfCaseTransform) ? _defaultTransform(chunk) : selfCaseTransform(chunk)).trim())

    !isNil(urlParams[chunk]) && pathChunks.push(String(urlParams[chunk]))
  }

  const methodPath = joinURL('', ...pathChunks)

  return _fetchInstance(methodPath, fetchOptions)
}
