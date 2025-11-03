import { Customer } from '@apideck/unify/models/components'
import { HiMail, HiPhone } from 'react-icons/hi'

const CustomerCard = ({ customer }: { customer: Customer }) => {
  return (
    <li className="col-span-1 bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 justify-between flex flex-col">
      <div className="w-full flex items-start justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 dark:text-white text-sm font-medium truncate">
              {customer.firstName
                ? `${customer.firstName} ${customer.lastName}`
                : customer.displayName}
            </h3>
          </div>
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm truncate">
            {customer.companyName || customer.displayName || customer.notes}
          </p>
        </div>
        {customer.status && (
          <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 dark:text-green-200 text-xs font-medium bg-green-100 dark:bg-green-900/30 rounded-full capitalize">
            {customer.status}
          </span>
        )}
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200 dark:divide-gray-700">
          {customer.emails && customer.emails?.length > 0 && (
            <div className="w-0 flex-1 flex">
              <a
                href={`mailto:${customer.emails[0].email}`}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 dark:text-gray-300 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 dark:hover:text-gray-400"
              >
                <HiMail className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">Email</span>
              </a>
            </div>
          )}
          {customer.phoneNumbers && customer.phoneNumbers?.length > 0 && (
            <div className="-ml-px w-0 flex-1 flex">
              <a
                href={`tel:${customer.phoneNumbers[0].number}`}
                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 dark:text-gray-300 font-medium border border-transparent rounded-br-lg hover:text-gray-500 dark:hover:text-gray-400"
              >
                <HiPhone className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">Call</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default CustomerCard
