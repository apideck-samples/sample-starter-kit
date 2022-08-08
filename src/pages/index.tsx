import Layout from 'components/Layout'
import { NextPage } from 'next'
import { withSession } from 'utils'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Invoices">
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <div className="p-5 bg-white rounded-lg shadow-xl sm:max-w-md sm:w-full">
          <img src="/img/logo.png" className="w-20 h-20 mx-auto -mt-10 rounded-full shadow-lg" />
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-xl font-semibold leading-6 text-gray-800">Sample Starter Kit</h3>

            <p className="my-2 text-gray-500">
              Welcome to the{' '}
              <a className="font-semibold hover:text-primary-500" href="https://www.apideck.com">
                Apideck
              </a>{' '}
              boilerplate for building Samples with the Unified APIs of Apideck.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default withSession(IndexPage)
