'use client'

import { ReactNode } from 'react'
import SidebarLayout from './SidebarLayout'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <div className="min-h-screen h-full">
    <SidebarLayout>
      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-8">{children}</div>
    </SidebarLayout>
  </div>
)

export default Layout
