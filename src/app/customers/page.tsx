'use client'

import Customers from '@/components/customers/Customers'
import Layout from '@/components/Layout'
import PageHeading from '@/components/PageHeading'
import SelectConnectionGrid from '@/components/SelectConnectionGrid'
import SessionGuard from '@/components/SessionGuard'
import { useConnections } from '@/utils/useConnections'
import { useSession } from '@/utils/useSession'

export default function CustomersPage() {
  const { session } = useSession()
  const { connection } = useConnections()

  if (!session) {
    return <SessionGuard />
  }

  const hasActiveConnection = connection?.enabled && connection?.state === 'callable'

  return (
    <Layout>
      <PageHeading
        title="Customers"
        description={
          hasActiveConnection
            ? `Customer data from ${connection.name}`
            : 'Select an integration to view customer data'
        }
      />
      {hasActiveConnection ? (
        <Customers />
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
              {!connection
                ? 'Select an integration to get started'
                : connection.state !== 'callable'
                  ? `Complete the setup for ${connection.name} to continue`
                  : 'Please enable your integration to continue'}
            </h3>
            <SelectConnectionGrid />
          </div>
        </div>
      )}
    </Layout>
  )
}
