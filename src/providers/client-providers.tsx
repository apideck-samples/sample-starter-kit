'use client'

import { ModalProvider, ToastProvider } from '@apideck/components'
import { ReactNode } from 'react'
import { ConnectionsProvider } from '@/utils/useConnections'
import { SessionProvider } from '@/utils/useSession'
import { QueryProvider } from './query-provider'

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ToastProvider>
        <ModalProvider>
          <SessionProvider>
            <ConnectionsProvider>{children}</ConnectionsProvider>
          </SessionProvider>
        </ModalProvider>
      </ToastProvider>
    </QueryProvider>
  )
}


