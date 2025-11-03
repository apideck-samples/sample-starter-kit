'use client'

import Layout from '@/components/Layout'
import Spinner from '@/components/Spinner'
import { useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const ecosystems = [
  {
    name: 'Perks Novo',
    url: 'https://perks.novo.co/'
  },
  {
    name: 'Aikido Security',
    url: 'https://aikido-hvnia0jnsv.apideck.io/'
  },
  {
    name: 'Beekeeper',
    url: 'https://beekeeper.apideck.io/'
  },
  {
    name: 'Lighthouse',
    url: 'https://stardekk.apideck.io/'
  },
  {
    name: 'Nmbrs',
    url: 'https://nmbrs.apideck.io/'
  },
  {
    name: 'Personio',
    url: 'https://personio.apideck.io/'
  },
  {
    name: 'SaasBlocks',
    url: 'https://saasblocks.apideck.io/'
  },
  {
    name: 'Trengo',
    url: 'https://trengo-2m85iy505a.apideck.io/'
  },
  {
    name: 'OneAdvanced',
    url: 'https://oneadvanced.apideck.io/'
  },
  {
    name: 'Apideck',
    url: 'https://requests.apideck.io/'
  }
]

export default function EcosystemPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  function handlePrevious() {
    setIsLoading(true)
    setCurrentIndex((prev) => (prev === 0 ? ecosystems.length - 1 : prev - 1))
  }

  function handleNext() {
    setIsLoading(true)
    setCurrentIndex((prev) => (prev === ecosystems.length - 1 ? 0 : prev + 1))
  }

  function handleIframeLoad() {
    setIsLoading(false)
  }

  const currentEcosystem = ecosystems[currentIndex]

  return (
    <Layout>
      <div className="flex flex-col -m-6 lg:-m-8" style={{ height: 'calc(100vh - 0px)' }}>
        {/* Navigation Header */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <HiChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex flex-col items-center gap-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentEcosystem.name}
              </h2>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {currentIndex + 1} of {ecosystems.length}
              </span>
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Next
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Iframe Content */}
        <div className="flex-1 relative overflow-hidden min-h-0">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-10">
              <Spinner className="h-12 w-12 text-gray-900 dark:text-white" />
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Loading ecosystem of {currentEcosystem.name}
              </p>
            </div>
          )}
          <iframe
            key={currentEcosystem.url}
            src={`${currentEcosystem.url}?embed=true`}
            className="w-full h-full border-0"
            title={currentEcosystem.name}
            onLoad={handleIframeLoad}
          />
        </div>
      </div>
    </Layout>
  )
}
