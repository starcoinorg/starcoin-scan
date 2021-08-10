import { Type } from '@sinclair/typebox'
import { ChainId } from 'utils/types'

export const BlockHeader = Type.Object({
  author: Type.String(),
  author_auth_key: Type.String(),
  block_accumulator_root: Type.String(),
  block_hash: Type.String(),
  body_hash: Type.String(),
  chain_id: ChainId,
  difficulty: Type.String(),
  difficulty_number: Type.Integer(),
  extra: Type.String(),
  gas_used: Type.Integer(),
  nonce: Type.Integer(),
  number: Type.Integer(),
  parent_hash: Type.String(),
  state_root: Type.String(),
  timestamp: Type.Integer(),
  txn_accumulator_root: Type.String(),
})

export const BlockMetadata = Type.Object({
  author: Type.String(),
  author_auth_key: Type.String(),
  chain_id: ChainId,
  number: Type.String(),
  parent_gas_used: Type.Integer(),
  parent_hash: Type.String(),
  timestamp: Type.Integer(),
  uncles: Type.String(),
})

export const RawUserTransaction = Type.Object({
  sender: Type.String(),
  sequence_number: Type.String(),
  payload: Type.String(),
  max_gas_amount: Type.String(),
  gas_unit_price: Type.String(),
  gas_token_code: Type.String(),
  expiration_timestamp_secs: Type.String(),
  chain_id: ChainId,
})

export const TransactionAuthenticator = Type.Union([
  Type.Object({
    Ed25519: Type.Object({
      public_key: Type.String(),
      signature: Type.String(),
    }),
  }),
  Type.Object({
    MultiEd25519: Type.Object({
      public_key: Type.String(),
      signature: Type.String(),
    }),
  }),
])

export const UserTransaction = Type.Object({
  transaction_hash: Type.String(),
  raw_txn: RawUserTransaction,
  authenticator: TransactionAuthenticator,
})

export default {
  '/block/{network}/height/{0}': {
    params: Type.Tuple([Type.Integer()]),
    result: Type.Object({
      body: Type.Object({
        Full: Type.Array(UserTransaction),
      }),
      header: BlockHeader,
      metadata: BlockMetadata,
      uncles: Type.Array(BlockHeader),
    }),
  },
  '/block/{network}/hash/{0}': {
    params: Type.Tuple([Type.String()]),
    result: Type.Object({
      body: Type.Object({
        Full: Type.Array(UserTransaction),
      }),
      header: BlockHeader,
      metadata: BlockMetadata,
      uncles: Type.Array(BlockHeader),
    }),
  },
}
