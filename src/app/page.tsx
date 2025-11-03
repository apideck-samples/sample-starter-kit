'use client'

import Layout from '@/components/Layout'
import PageHeading from '@/components/PageHeading'
import SelectConnectionGrid from '@/components/SelectConnectionGrid'
import SessionGuard from '@/components/SessionGuard'
import SessionPreviewCard from '@/components/SessionPreviewCard'
import { useSession } from '@/utils/useSession'

export default function HomePage() {
  const { session } = useSession()

  return (
    <Layout>
      {session ? (
        <div className="space-y-6">
          <PageHeading
            title="Dashboard"
            description="Manage your integrations and view session details"
          />
          <SessionPreviewCard />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Integrations
            </h2>
            <SelectConnectionGrid />
          </div>
        </div>
      ) : (
        <SessionGuard />
      )}
    </Layout>
  )
}
