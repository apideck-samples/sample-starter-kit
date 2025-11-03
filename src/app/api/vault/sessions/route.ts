import { Apideck } from '@apideck/unify'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const consumerId =
    searchParams.get('consumerId') || `demo-accounting-${Math.random()}-${new Date().toISOString()}`

  try {
    const apideck = new Apideck({
      apiKey: `${process.env.APIDECK_API_KEY}`,
      appId: `${process.env.APIDECK_APP_ID}`,
      consumerId
    })

    const body = await request.json()
    const result = await apideck.vault.sessions.create({ session: body })

    if (result.createSessionResponse && result.createSessionResponse.data) {
      return NextResponse.json(result.createSessionResponse)
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('[API Vault Sessions] Error:', error)
    const errorMessage = error?.message || 'Failed to create session'
    const errorStatus = error?.statusCode || 500
    return NextResponse.json(
      { message: errorMessage, error: error?.toString() },
      { status: errorStatus }
    )
  }
}
