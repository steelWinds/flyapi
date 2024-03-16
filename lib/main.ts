import { ofetch, type FetchOptions } from 'ofetch'
import { proxyHandler, type FlyapiHandlerOptions } from './proxy-handler'

type GeneratedFlyapiSchema<T extends Record<string, any>> = { [K in keyof T]: (options?: FlyapiHandlerOptions) => Promise<T[K]> }

interface FlyapiFabricOptions {
  fetchOptions?: FetchOptions
  caseTransform?: (str: string) => string
}

const flyapi = <T extends Record<string, any>>(options: FlyapiFabricOptions = {}): GeneratedFlyapiSchema<T> => {
  const { fetchOptions = {}, caseTransform = (str: string) => str } = options

  const _fetchInstance = ofetch.create(fetchOptions)

  return new Proxy({} as any, {
    get (_, prop) {
      if (typeof prop === 'symbol') {
        throw new Error('Properties must be a string')
      }

      return proxyHandler.bind(null, prop, _fetchInstance, caseTransform)
    }
  })
}

export { flyapi }
