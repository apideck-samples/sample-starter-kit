'use client'

import { useSession } from '@/utils/useSession'
import { Button } from '@apideck/components'
import { HiClock, HiIdentification, HiMail, HiUser } from 'react-icons/hi'

export default function SessionPreviewCard() {
  const { session, clearSession } = useSession()

  if (!session) return null

  console.log('session', session)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {session.consumerMetadata?.image && (
            <img
              src={session.consumerMetadata.image}
              alt={session.consumerMetadata.userName || 'User'}
              className="w-16 h-16 rounded-full ring-2 ring-primary-500 dark:ring-primary-400"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active session</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your test session is active and ready to use
            </p>
          </div>
        </div>
        <Button text="Clear Session" variant="outline" size="small" onClick={clearSession} />
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {session.consumerMetadata?.userName && (
          <div className="flex items-center gap-3">
            <HiUser className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Username</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {session.consumerMetadata.userName}
              </p>
            </div>
          </div>
        )}
        {session.consumerMetadata?.email && (
          <div className="flex items-center gap-3">
            <HiMail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {session.consumerMetadata.email}
              </p>
            </div>
          </div>
        )}
        {session.consumerId && (
          <div className="flex items-center gap-3">
            <HiIdentification className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Consumer ID</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {session.consumerId}
              </p>
            </div>
          </div>
        )}
        {session.accountName && (
          <div className="flex items-center gap-3">
            <HiClock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Account</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {session.accountName}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
