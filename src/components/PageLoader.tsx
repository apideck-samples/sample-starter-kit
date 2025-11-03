'use client'

import Layout from './Layout'
import type { ReactNode } from 'react'
import Spinner from './Spinner'

interface Props {
  children?: ReactNode
}

function PageLoader({ children }: Props) {
  return (
    <Layout>
      {children ? (
        children
      ) : (
        <div className="flex items-center justify-center min-h-screen p-4 text-center">
          <Spinner />
        </div>
      )}
    </Layout>
  )
}

export default PageLoader
