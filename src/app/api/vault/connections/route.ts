import { init } from '@/lib/apideck'
import { NextRequest, NextResponse } from 'next/server'

const UNIFIED_API = 'accounting' // Replace with Apideck API ID to filter connections by API. Exclude this parameter to fetch all connections.

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const jwt = searchParams.get('jwt')

  if (!jwt) {
    return NextResponse.json({ error: 'JWT token required' }, { status: 400 })
  }

  try {
    const apideck = init(jwt)
    const result = await apideck.vault.connections.list({
      api: UNIFIED_API
    })

    // The SDK returns { getConnectionsResponse: { data: [...], ... } }
    return NextResponse.json(result.getConnectionsResponse || result)
  } catch (error: any) {
    console.error('[API Vault Connections] Error:', error)
    const errorMessage = error?.message || 'Failed to fetch connections'
    const errorStatus = error?.statusCode || 500
    return NextResponse.json(
      { message: errorMessage, error: error?.toString() },
      { status: errorStatus }
    )
  }
}
