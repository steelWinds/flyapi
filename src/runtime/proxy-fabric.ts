import { ofetch, type FetchOptions } from 'ofetch'
import { defaultExecuteHandler, type FlyapiHandlerOptions } from 'src/runtime/default-execute-handler'
import { isNil } from 'src/utils'

interface ExecuteHandler<T> {
  exec: <Concrete = null>(options?: FlyapiHandlerOptions) => Promise<Concrete extends null ? T : Concrete extends T ? Concrete : never>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type FlyapiGroup<T, _SelfExec = null> = {
  [K in keyof T]: T[K]
} & { _schema: never }

export type GeneratedFlyapiGroupWithSelf<Schema, SelfExec = null> = Schema & (SelfExec extends null ? unknown : ExecuteHandler<SelfExec>)

export type GeneratedFlyapiGroup<Path, SelfExec = null> = GeneratedFlyapiGroupWithSelf<Omit<Path, '_schema'>, SelfExec>

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExecuteHandlerExtractor<Path> = Path extends Function ? Path : ExecuteHandler<Path>

export type GeneratedFlyapiPath<Path> = Path extends FlyapiGroup<Path, infer SelfExec> ? GeneratedFlyapiSchema<GeneratedFlyapiGroup<Path, SelfExec>> : ExecuteHandlerExtractor<Path>

export type GeneratedFlyapiSchema<Schema extends Record<string, any>> = {
  [Key in keyof Schema]: GeneratedFlyapiPath<Schema[Key]>
}

interface FlyapiFabricOptions {
  fetchOptions?: FetchOptions
  caseTransform?: (str: string) => string
  executeHandler?: typeof defaultExecuteHandler
}

interface FlyapiCallItem {
  __callStack?: string[]
}

export const proxyFabric = <T extends Record<string, any>>(options: FlyapiFabricOptions = {}): GeneratedFlyapiSchema<T> => {
  const { fetchOptions = {}, caseTransform, executeHandler } = options

  const fetchInstance = ofetch.create(fetchOptions)
  const _executeHandler = (executeHandler ?? defaultExecuteHandler).bind(null, fetchInstance, caseTransform)
  const executeCallStack = (recordedChunks: string[], options?: FlyapiHandlerOptions): Promise<unknown> => {
    return _executeHandler(recordedChunks, options)
  }

  const proxyHandler = {
    get (target: FlyapiCallItem, prop: string): any {
      if (typeof prop !== 'string') {
        throw new Error('Properties must be a string')
      }

      if (isNil(target.__callStack)) return new Proxy({ __callStack: [prop] }, proxyHandler)

      if (prop === 'exec') return executeCallStack.bind(null, target.__callStack)

      target.__callStack.push(prop)

      return new Proxy(target, proxyHandler)
    }
  }

  return new Proxy({}, proxyHandler) as GeneratedFlyapiSchema<T>
}
