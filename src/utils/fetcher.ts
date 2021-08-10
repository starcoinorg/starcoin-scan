class HTTPError extends Error {
  public status: number

  public message: string

  constructor(status: number, message: string) {
    super()
    this.status = status
    this.message = message
  }
}

export async function jsonFetcher<T>(input: RequestInfo): Promise<T> {
  const response = await fetch(input)
  if (response.ok) {
    return response.json()
  }
  throw new HTTPError(response.status, response.statusText)
}

export async function stcScanFetcher<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.stcscan.io/v2${path}`)
  if (response.ok) {
    return response.json()
  }
  throw new HTTPError(response.status, response.statusText)
}
