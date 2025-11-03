'use client'

import { useConnections } from '@/utils/useConnections'
import { useSession } from '@/utils/useSession'
import { Vault } from '@apideck/react-vault'
import { Connection } from '@apideck/unify/models/components'
import { useState } from 'react'
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi'

export default function SelectConnectionGrid() {
  const { connections, setConnectionId, refetch } = useConnections()
  const { token } = useSession()
  const [serviceId, setServiceId] = useState<string | null>(null)

  const selectConnection = async (connection: Connection) => {
    if (connection.state === 'callable') {
      setConnectionId(connection.id as string)
    } else {
      setServiceId(connection.serviceId as string)
    }
  }

  const handleVaultClose = () => {
    setServiceId(null)
    refetch()
  }

  const getConnectionStatus = (connection: Connection) => {
    if (!connection.enabled) {
      return {
        label: 'Disabled',
        color: 'text-gray-500 dark:text-gray-400',
        icon: HiExclamationCircle
      }
    }
    if (connection.state !== 'callable') {
      return {
        label: 'Setup Required',
        color: 'text-yellow-600 dark:text-yellow-400',
        icon: HiExclamationCircle
      }
    }
    return { label: 'Connected', color: 'text-green-600 dark:text-green-400', icon: HiCheckCircle }
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No integrations configured.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection: Connection) => {
          const status = getConnectionStatus(connection)
          const StatusIcon = status.icon

          return (
            <button
              key={connection.id}
              onClick={() => selectConnection(connection)}
              className="relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary-500 dark:hover:border-primary-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 transition-all"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                  src={connection.icon}
                  alt={connection.name}
                />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {connection.name}
                </p>
                <p className={`text-sm ${status.color} flex items-center gap-1`}>
                  <StatusIcon className="w-4 h-4" />
                  {status.label}
                </p>
              </div>
            </button>
          )
        })}
      </div>
      {token && serviceId && (
        <Vault
          token={token}
          open={true}
          showAttribution={false}
          serviceId={serviceId}
          unifiedApi="accounting"
          onClose={handleVaultClose}
        />
      )}
    </>
  )
}
