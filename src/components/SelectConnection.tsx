import { Menu, Transition } from '@headlessui/react'

import { Connection } from '@apideck/node'
import Spinner from './Spinner'
import { Vault } from '@apideck/react-vault'
import { useConnection } from 'utils'
import useSWR from 'swr'
import { useSession } from 'utils/useSession'
import { useState } from 'react'

const UNIFIED_API = 'accounting' // Replace with Apideck API ID to filter connections by API. Leave blank to fetch all connections.

const SelectConnection = () => {
  const { setConnection, connection } = useConnection()
  const { session } = useSession()
  const [serviceId, setServiceId] = useState<string | null>(null)

  const getConnections = async (url: string) => {
    const response = await fetch(url)
    return await response.json()
  }

  const { data: connections, error } = useSWR(
    session?.jwt ? `/api/vault/connections?jwt=${session?.jwt}` : null,
    getConnections
  )
  const isLoading = session && !connections && !error

  const selectConnection = async (connection: Connection) => {
    if (connection.state === 'callable') {
      setConnection(connection)
    } else {
      setServiceId(connection.service_id as string)
    }
  }

  const statusColor = (connection: Connection) => {
    if (!connection.enabled) return 'bg-gray-300'
    if (connection.state !== 'callable') return 'bg-yellow-400'
    return 'bg-green-400'
  }

  return (
    <div className="relative w-full">
      <Menu>
        {({ open }: { open: boolean }) => (
          <>
            <Menu.Button className="bg-ui-600 text-white w-full flex items-center justify-between px-4 py-2 text-sm font-medium border rounded-md shadow-sm border-ui-500 group hover:bg-ui-500 focus:outline-none">
              <div className="flex items-center">
                {!isLoading && connection?.icon && (
                  <div className="w-6 h-6 -ml-0.5 mr-2.5">
                    <img
                      className={`rounded-full ring-2 ring-ui-400 ${
                        isLoading ? 'animate-spin opacity-20' : ''
                      }`}
                      src={!isLoading && connection?.icon ? connection?.icon : '/img/logo.png'}
                      alt={connection.name}
                      height={28}
                      width={28}
                    />
                  </div>
                )}
                {isLoading && <Spinner className="w-6 h-6" />}
                {!isLoading && <span>{connection?.name || 'Select integration'}</span>}
              </div>
              <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Menu.Button>
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              className="min-w-sm"
            >
              <Menu.Items
                static
                className="absolute custom-scrollbar-dark max-h-96 overflow-y-auto right-0 z-10 w-full mt-2 origin-top-right backdrop-blur-md bg-ui-500/40 border divide-y rounded-md outline-none border-ui-500 divide-ui-500"
                style={{ scrollbarColor: 'red' }}
              >
                <div className="py-1">
                  {connections?.data?.map((connection: Connection, i: number) => {
                    return (
                      <Menu.Item key={i}>
                        {({ active }: { active: boolean }) => (
                          <div
                            onClick={() => selectConnection(connection)}
                            className={`${
                              active ? 'backdrop-blur-lg bg-ui-500/50 transition' : 'bg-none'
                            } flex items-center justify-between min-w-0 px-2 cursor-pointer py-0.5 overflow-hidden ${
                              connection.enabled ? '' : 'opacity-60'
                            }`}
                          >
                            <div className="flex p-2">
                              <img
                                className="rounded-full ring-ui-400 ring-2"
                                src={connection.icon}
                                alt={connection.name}
                                height={28}
                                width={28}
                              />
                            </div>
                            <span className="flex-1 min-w-0">
                              <span className="text-sm ml-1 text-white truncate">
                                {connection.name}
                              </span>
                            </span>

                            <span
                              className={`inline-block w-2.5 h-2.5 mr-2 rounded-full ${statusColor(
                                connection
                              )}`}
                            ></span>
                          </div>
                        )}
                      </Menu.Item>
                    )
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
      {session?.jwt && serviceId && (
        <Vault
          token={session.jwt}
          open={true}
          showAttribution={false}
          serviceId={serviceId}
          unifiedApi={UNIFIED_API}
          onClose={() => setServiceId(null)}
        />
      )}
    </div>
  )
}

export default SelectConnection
