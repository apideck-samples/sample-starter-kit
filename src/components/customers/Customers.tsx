'use client'

import Spinner from '@/components/Spinner'
import { useConnections } from '@/utils/useConnections'
import { useCustomers } from '@/utils/useCustomers'
import { useSession } from '@/utils/useSession'
import { Button } from '@apideck/components'
import { Vault } from '@apideck/react-vault'
import { Customer } from '@apideck/unify/models/components'
import { useState } from 'react'
import { HiExclamation, HiOutlineUserGroup } from 'react-icons/hi'
import CustomerCard from './CustomerCard'

const Customers = () => {
  const { customers, isLoading, isError } = useCustomers()
  const [vaultOpen, setVaultOpen] = useState(false)
  const { token } = useSession()
  const { refetch: refetchConnections } = useConnections()

  const handleVaultClose = () => {
    setVaultOpen(false)
    refetchConnections()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 p-4 text-center">
        <Spinner />
      </div>
    )
  }

  // Error State - handles 403/401/402 errors
  if (isError) {
    const error = isError as any
    const statusCode = error?.statusCode
    const isAuthError = statusCode === 401 || statusCode === 402 || statusCode === 403

    return (
      <div className="text-center bg-white dark:bg-gray-900 py-10 px-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 fade-in">
        <HiExclamation className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-2 text-sm font-medium text-red-800 dark:text-red-300">
          {error?.message || 'An error occurred'}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {error?.detail?.message || JSON.stringify(error?.detail) || ''}
        </p>
        {isAuthError && (
          <>
            <p className="mt-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
              This could be an issue with the connection&apos;s permissions or subscription.
            </p>
            <Button
              text="Re-authorize connection"
              onClick={() => setVaultOpen(true)}
              variant="primary"
            />
          </>
        )}
      </div>
    )
  }

  // Empty State
  if (!customers || customers.length === 0) {
    return (
      <div className="text-center bg-white dark:bg-gray-900 py-10 px-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 fade-in">
        <HiOutlineUserGroup className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          No customers found
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          No customer data available from the connected integration.
        </p>
      </div>
    )
  }

  return (
    <>
      <ul role="list" className="py-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {customers?.map((customer: Customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </ul>
      {token && vaultOpen && (
        <Vault
          token={token}
          open={vaultOpen}
          showAttribution={false}
          unifiedApi="accounting"
          onClose={handleVaultClose}
        />
      )}
    </>
  )
}
export default Customers
