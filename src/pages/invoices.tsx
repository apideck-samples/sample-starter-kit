import { useConnection, useInvoices, withSession } from 'utils'

import { Invoice } from '@apideck/node'
import Layout from 'components/Layout'
import { NextPage } from 'next'
import PageLoader from 'components/PageLoader'

const InvoicesPage: NextPage = () => {
  const { invoices, isLoading } = useInvoices() // Example of using custom hook to fetch from Accounting API.
  const { connection } = useConnection()

  if (connection && isLoading) return <PageLoader />

  return (
    <Layout title="Invoices">
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center truncate">
        {!connection && <p>Please first select a integration in the sidebar</p>}
        {invoices?.map((invoice: Invoice) => {
          return <p key={invoice.id}>{invoice.id}</p>
        })}
      </div>
    </Layout>
  )
}

export default withSession(InvoicesPage)
