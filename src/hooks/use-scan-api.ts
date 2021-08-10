import useSWR, { SWRConfiguration } from 'swr'
import type { Static } from '@sinclair/typebox'
import useNetwork from 'hooks/use-network'
import { API, scanApi } from 'utils/scan-api'

export default function useScanApi<T extends keyof typeof API>(
  method?: T,
  params?: Static<typeof API[T]['params']>,
  config?: SWRConfiguration,
) {
  const network = useNetwork()
  return useSWR<Static<typeof API[T]['result']>>(
    method && params
      ? [network, 'jsonRpc', method, ...params.map((param) => JSON.stringify(param))]
      : null,
    () => scanApi(network, method!, ...params!),
    config,
  )
}
