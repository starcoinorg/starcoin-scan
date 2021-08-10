import { Type } from '@sinclair/typebox'

export type Network = 'main' | 'barnard' | 'halley' | 'proxima'

export const BlockHeader = Type.Object({
  author: Type.String(),
  author_auth_key: Type.String(),
  block_accumulator_root: Type.String(),
  block_hash: Type.String(),
  body_hash: Type.String(),
  chain_id: Type.Integer(),
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
  chain_id: Type.String(),
  number: Type.String(),
  parent_gas_used: Type.Integer(),
  parent_hash: Type.String(),
  timestamp: Type.Integer(),
  uncles: Type.String(),
})
