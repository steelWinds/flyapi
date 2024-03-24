import type { $Fetch, FetchOptions } from 'ofetch'
import { isNil } from 'src/utils'
import { joinURL } from 'ufo'

export interface FlyapiHandlerOptions extends FetchOptions {
  urlParams?: Record<string, string | number>
  caseTransform?: (str: string) => string
}

export const defaultExecuteHandler = <T>(
  _fetchInstance: $Fetch,
  _defaultTransform: ((str: string) => string) | undefined,
  chunks: string[],
  options: FlyapiHandlerOptions = {}
): Promise<T> => {
  const { caseTransform, urlParams = {}, ...fetchOptions } = options

  const pathChunks: string[] = []

  const transformFn = caseTransform ?? _defaultTransform

  for (const chunk of chunks) {
    pathChunks.push((isNil(transformFn) ? chunk : transformFn(chunk)).trim())

    !isNil(urlParams[chunk]) && pathChunks.push(String(urlParams[chunk]))
  }

  const methodPath = joinURL('', ...pathChunks)

  return _fetchInstance(methodPath, fetchOptions)
}
