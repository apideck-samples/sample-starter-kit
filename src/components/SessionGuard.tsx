'use client'

import { useSession } from '@/utils/useSession'
import { Button, TextInput } from '@apideck/components'
import { useState } from 'react'

function generateRandomId() {
  return 'test_consumer_' + Math.random().toString(36).substring(2, 10)
}

export default function SessionGuard() {
  const [consumerId, setConsumerId] = useState('')
  const [userName, setUserName] = useState('Lebron James')
  const [email, setEmail] = useState('lebron@lakers.com')
  const [image, setImage] = useState(
    'https://pyxis.nymag.com/v1/imgs/847/0f7/504c63a03d8a751a5cbeda0bc064306bb4-lebron-james.rsquare.w400.jpg'
  )
  const { createSession, isLoading } = useSession()

  return (
    <div className="flex items-center justify-center h-full p-4 text-center">
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl sm:max-w-sm sm:w-full border border-gray-200 dark:border-gray-800">
        <img
          src="/img/logo.png"
          className="w-20 h-20 mx-auto -mt-10 rounded-full shadow-lg"
          alt="Logo"
        />
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-xl font-semibold leading-6 text-gray-800 dark:text-white">
            Create Session
          </h3>
          <p className="my-3 text-gray-500 dark:text-gray-400 pb-3 border-b border-gray-100 dark:border-gray-800">
            Enter a consumer ID and create a new test session to get started.
          </p>
          <div className="space-y-3 text-left">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-300 mb-1"
              >
                Username
              </label>
              <TextInput
                onChange={(e) => setUserName(e.currentTarget.value)}
                value={userName}
                name="username"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <TextInput
                onChange={(e) => setEmail(e.currentTarget.value)}
                value={email}
                name="email"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-300 mb-1"
              >
                Image
              </label>
              <TextInput
                onChange={(e) => setImage(e.currentTarget.value)}
                value={image}
                name="image"
              />
            </div>
            <div>
              <label
                htmlFor="consumerId"
                className="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-300 mb-1"
              >
                Consumer ID*
              </label>
              <div className="flex space-x-3">
                <TextInput
                  onChange={(e) => setConsumerId(e.currentTarget.value)}
                  value={consumerId}
                  name="consumerId"
                  autoFocus={true}
                />
                <Button
                  onClick={() => setConsumerId(generateRandomId())}
                  text="Generate ID"
                  variant="secondary"
                  className="whitespace-nowrap"
                />
              </div>
            </div>
            <div>
              <Button
                onClick={() =>
                  createSession({ consumerId, consumerMetadata: { userName, email, image } })
                }
                text="Create session"
                className="whitespace-nowrap w-full"
                isLoading={isLoading}
                disabled={!consumerId}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                *Provide a unique ID. Most of the time, this is an ID of your internal data model
                that represents a user or account. For testing purposes, you can use a random
                string.
              </p>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-center">
            <a
              href="https://www.apideck.com/samples/accounting"
              className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Return to Apideck Samples
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
