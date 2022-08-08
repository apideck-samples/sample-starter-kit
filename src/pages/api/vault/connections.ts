import { VercelRequest, VercelResponse } from '@vercel/node'

import { GetConnectionsResponse } from '@apideck/node'
import { init } from '../_utils'

interface Params {
  jwt?: string
}

const UNIFIED_API = 'accounting' // Replace with Apideck API ID to filter connections by API. Leave blank to fetch all connections.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { jwt }: Params = req.query
  const apideck = init(jwt as string)

  const result: Promise<GetConnectionsResponse> = await apideck.vault
    .connectionsAll({ api: UNIFIED_API })
    .catch(async (error: Response) => await error.json())

  res.json(result)
}
