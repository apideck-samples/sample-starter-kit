import { Apideck } from '@apideck/node'
import camelCaseKeys from 'camelcase-keys-deep'
import { decode } from 'jsonwebtoken'

export const init = (jwt: string) => {
  const decoded: any = decode(jwt)
  const { applicationId, consumerId } = camelCaseKeys(decoded) as any

  return new Apideck({
    apiKey: `${process.env.APIDECK_API_KEY}`,
    appId: `${applicationId}`,
    consumerId
    // basePath: 'https://mock-api.apideck.com/'
  })
}
