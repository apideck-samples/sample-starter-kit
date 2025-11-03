'use client'

import { Connection } from '@apideck/unify/models/components'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, ReactNode, createContext, useContext, useEffect } from 'react'
import { useCookieState } from './useCookieState'
import { useSession } from './useSession'

interface ContextProps {
  setConnectionId: Dispatch<string>
  connectionId?: string | null
  connections: Connection[]
  connection: Connection | null
  isLoading: boolean
  refetch: () => void
}

const ConnectorContext = createContext<Partial<ContextProps>>({})

async function fetchConnections(jwt: string) {
  const response = await fetch(`/api/vault/connections?jwt=${jwt}`)
  if (!response.ok) {
    throw new Error('Failed to fetch connections')
  }
  return response.json()
}

export const ConnectionsProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useSession()
  const [connectionId, setConnectionId] = useCookieState('connectionId', null, {
    encodeOps: {
      maxAge: 60 * 10 // 10 mins
    }
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['connections', session?.jwt],
    queryFn: () => fetchConnections(session!.jwt),
    enabled: !!session?.jwt,
    retry: (failureCount, error: any) => {
      // Don't retry on 400 errors (invalid JWT)
      if (error?.message?.includes('JWT') || error?.message?.includes('400')) {
        return false
      }
      return failureCount < 2
    },
    retryDelay: 1000,
    staleTime: 30000 // 30 seconds
  })

  const connections = data?.data
  const connection = connections?.find((c: Connection) => c.id === connectionId)

  // Auto-select first callable connection if none selected
  useEffect(() => {
    if (!connections) return

    const callableConnections = connections.filter((c: Connection) => c.state === 'callable')

    if (!connectionId && callableConnections.length > 0) {
      setConnectionId(callableConnections[0].id as string)
    } else if (
      connectionId &&
      callableConnections.length > 0 &&
      !callableConnections.find((c: Connection) => c.id === connectionId)
    ) {
      // Clear connection if currently selected one is no longer callable
      setConnectionId(null)
    }
  }, [connections, connectionId, setConnectionId])

  return (
    <ConnectorContext.Provider
      value={{ setConnectionId, connection, isLoading, connections, refetch }}
    >
      {children}
    </ConnectorContext.Provider>
  )
}

export const useConnections = () => {
  return useContext(ConnectorContext) as ContextProps
}
