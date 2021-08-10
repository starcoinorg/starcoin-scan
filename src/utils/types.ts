import { Type } from '@sinclair/typebox'

export type Network = 'main' | 'barnard' | 'halley' | 'proxima'

export const ChainId = Type.Union([
  Type.Literal(1),
  Type.Literal(2),
  Type.Literal(251),
  Type.Literal(253),
])
