import { Binary, Decimal128 } from 'bson'
import { NextApiRequest, NextApiResponse } from 'next'
import { collections } from 'utils/database/mongo'
import { Network } from 'utils/types'
import { mapper } from 'utils/api'
import { maintenance } from 'utils/database/maintenance'
import { arrayify } from 'utils/encoding'
import { API_PAGE_SIZE } from 'utils/constants'

export default async function transactionsByAddress(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { network, address, ...query } = req.query as {
    network: Network
    address: string
    height?: string
  }
  const height = query.height ? BigInt(query.height) : undefined

  const data = await collections[network].transactions
    .find({
      sender: new Binary(arrayify(address)),
      ...(height ? { height: { $lte: new Decimal128(height.toString()) } } : {}),
    })
    .sort({ height: -1 })
    .limit(API_PAGE_SIZE)
    .toArray()

  maintenance(network, height)

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.json(data.map(mapper))
}