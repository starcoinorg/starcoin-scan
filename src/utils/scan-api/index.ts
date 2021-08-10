import type { Static } from '@sinclair/typebox'
import addFormats from 'ajv-formats'
import Ajv from 'ajv/dist/2019'
import block from './block'

const ajv = addFormats(new Ajv()).addKeyword('kind').addKeyword('modifier')

export const API = {
  ...block,
}

export async function scanApi<T extends keyof typeof API>(
  network: string,
  method: T,
  ...params: Static<typeof API[T]['params']>
): Promise<Static<typeof API[T]['result']>> {
  if (!ajv.validate(API[method].params, params)) {
    throw new Error(`${method}(${params.join(', ')}) params ${ajv.errorsText(ajv.errors)}`)
  }
  const pathname = (params as unknown[]).reduce(
    (str: string, param, index) => str.replace(`{${index}}`, String(param)),
    method.replace('{network}', network),
  )
  const response = await fetch(`https://api.stcscan.io/v2${pathname}`)
  if (response.ok) {
    const json = await response.json()
    if (ajv.validate(API[method].result, json.result)) {
      return json.result
    }
    throw new Error(`${method}(${params.join(', ')}) result ${ajv.errorsText(ajv.errors)}`)
  }
  throw new Error(`${method}(${params.join(', ')}) result ${response.statusText}`)
}
