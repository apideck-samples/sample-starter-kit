import { init } from '@/lib/apideck'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const jwt = searchParams.get('jwt')
  const serviceId = searchParams.get('serviceId')
  const cursor = searchParams.get('cursor')

  if (!jwt) {
    return NextResponse.json({ error: 'JWT token required' }, { status: 400 })
  }

  try {
    const apideck = init(jwt)
    const response = await apideck.accounting.customers.list({
      limit: 20,
      serviceId: serviceId || undefined,
      cursor: cursor || undefined
    })

    return NextResponse.json(response.getCustomersResponse || response)
  } catch (error: any) {
    console.error('[API Accounting Customers] Error:', error)
    const errorMessage = error?.message || 'Failed to fetch customers'
    const errorStatus = error?.statusCode || 500
    return NextResponse.json(
      { message: errorMessage, error: error?.toString() },
      { status: errorStatus }
    )
  }
}
