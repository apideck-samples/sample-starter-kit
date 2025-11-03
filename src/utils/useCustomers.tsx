'use client'

import { usePrevious } from '@apideck/components'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useConnections } from './useConnections'
import { useSession } from './useSession'

async function fetchCustomers(jwt: string, serviceId: string, cursor?: string) {
  const cursorParams = cursor ? `&cursor=${cursor}` : ''
  const response = await fetch(
    `/api/accounting/customers/all?jwt=${jwt}&serviceId=${serviceId}${cursorParams}`
  )
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }))
    const error: any = new Error(errorData.message || 'Failed to fetch customers')
    error.statusCode = response.status
    error.detail = errorData.detail || errorData
    throw error
  }
  return response.json()
}

export const useCustomers = () => {
  const [cursor, setCursor] = useState<string | null>(null)
  const { connection } = useConnections()
  const { session } = useSession()
  const serviceId = connection?.serviceId || ''
  const prevServiceId = usePrevious(serviceId)

  const hasNewCursor = cursor && (!prevServiceId || prevServiceId === serviceId)

  const { data, isLoading, error } = useQuery({
    queryKey: ['customers', session?.jwt, serviceId, hasNewCursor ? cursor : null],
    queryFn: () => fetchCustomers(session!.jwt, serviceId, hasNewCursor ? cursor! : undefined),
    enabled: !!serviceId && !!session?.jwt
  })

  useEffect(() => {
    if (prevServiceId && prevServiceId !== serviceId) {
      setCursor(null)
    }
  }, [serviceId, prevServiceId])

  const nextPage = () => {
    const nextCursor = data?.meta?.cursors?.next

    if (nextCursor) {
      setCursor(nextCursor)
    }
  }

  return {
    customers: data?.data,
    isLoading,
    isError: data?.error || error,
    hasNextPage: data?.meta?.cursors?.next,
    nextPage
  }
}
