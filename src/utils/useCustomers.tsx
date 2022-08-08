import { useEffect, useState } from 'react'

import { fetcher } from './fetcher'
import { useConnections } from './useConnections'
import { usePrevious } from '@apideck/components'
import useSWR from 'swr'
import { useSession } from './useSession'

export const useCustomers = () => {
  const [cursor, setCursor] = useState(null)
  const { connection } = useConnections()
  const { session } = useSession()
  const serviceId = connection?.service_id || ''
  const prevServiceId = usePrevious(serviceId)

  const hasNewCursor = cursor && (!prevServiceId || prevServiceId === serviceId)
  const cursorParams = hasNewCursor ? `&cursor=${cursor}` : ''
  const getCustomersUrl = serviceId
    ? `/api/accounting/customers/all?jwt=${session?.jwt}&serviceId=${serviceId}${cursorParams}`
    : null

  const { data, error } = useSWR(getCustomersUrl, fetcher)

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
    isLoading: !error && !data,
    isError: data?.error || error,
    hasNextPage: data?.meta?.cursors?.next,
    nextPage
  }
}
