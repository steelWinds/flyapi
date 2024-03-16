import { ofetch, type FetchOptions } from 'ofetch'
import { proxyHandler, type FlyapiHandlerOptions } from './proxy-handler'

interface ExecuteHandler<T> {
  exec: <Concrete = null>(options?: FlyapiHandlerOptions) => Promise<Concrete extends null ? T : Concrete extends T ? Concrete : never>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Group<T, _SelfExec = null> = {
  [K in keyof T]: T[K]
} & { _schema: never }

export type GeneratedFlyapiGroupWithSelf<Schema, SelfExec = null> = Schema & (SelfExec extends null ? unknown : ExecuteHandler<SelfExec>)

export type GeneratedFlyapiGroup<Path, SelfExec = null> = GeneratedFlyapiGroupWithSelf<Omit<Path, '_schema'>, SelfExec>

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExecuteHandlerExtractor<Path> = Path extends Function ? Path : ExecuteHandler<Path>

export type GeneratedFlyapiPath<Path> = Path extends Group<Path, infer SelfExec> ? GeneratedFlyapiSchema<GeneratedFlyapiGroup<Path, SelfExec>> : ExecuteHandlerExtractor<Path>

export type GeneratedFlyapiSchema<Schema extends Record<string, any>> = {
  [Key in keyof Schema]: GeneratedFlyapiPath<Schema[Key]>
}

interface FlyapiFabricOptions {
  fetchOptions?: FetchOptions
  caseTransform?: (str: string) => string
}

const flyapi = <T extends Record<string, any>>(options: FlyapiFabricOptions = {}): GeneratedFlyapiSchema<T> => {
  const { fetchOptions = {}, caseTransform = (str: string) => str } = options

  const _fetchInstance = ofetch.create(fetchOptions)
  const handler = proxyHandler.bind(null, _fetchInstance, caseTransform)

  let recordedChunks: string[] = []

  const executedInstance = {
    exec (options?: FlyapiHandlerOptions) {
      const chunks = recordedChunks

      recordedChunks = []

      return handler(chunks, options)
    }
  }

  const proxy = new Proxy(executedInstance, {
    get (target, prop, receiver) {
      if (typeof prop === 'symbol') {
        throw new Error('Properties must be a string')
      }

      if (prop === 'exec') return Reflect.get(target, prop, receiver)

      recordedChunks.push(prop)

      return proxy
    }
  }) as GeneratedFlyapiSchema<T>

  return proxy
}

export { flyapi }
