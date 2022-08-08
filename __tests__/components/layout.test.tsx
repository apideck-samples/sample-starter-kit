import { render, waitFor } from '@testing-library/react'

import Layout from 'components/Layout'

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>
    }
  }
})

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '/',
    pathname: '/',
    query: '',
    asPath: '/',
    prefetch: () => null,
    push: () => null
  })
}))

describe('Layout Component', () => {
  it('matches the snapshot', async () => {
    render(
      <Layout>
        <div>test</div>
      </Layout>
    )
    await waitFor(() => {
      expect(screen).toMatchSnapshot()
    })
  })
  it('renders the page layout with the correct document title', async () => {
    render(
      <Layout title="Test document title">
        <div>App</div>
      </Layout>
    )
    await waitFor(() => {
      expect(document.title).toEqual('Test document title')
    })
  })
})
