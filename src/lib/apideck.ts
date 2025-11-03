import { Apideck } from '@apideck/unify'
import { decode } from 'jsonwebtoken'

export function init(jwt: string) {
  if (!jwt) {
    throw new Error('JWT is required')
  }

  const decoded: unknown = decode(jwt)

  if (!decoded || typeof decoded !== 'object' || decoded === null) {
    throw new Error('Invalid JWT token: Failed to decode or not an object.')
  }

  const decodedObject = decoded as Record<string, any>

  // JWT might have snake_case or camelCase - handle both
  const applicationId = decodedObject.applicationId || decodedObject.application_id
  const consumerId = decodedObject.consumerId || decodedObject.consumer_id

  if (!applicationId) {
    throw new Error('Missing applicationId in JWT token')
  }

  if (!consumerId) {
    throw new Error('Missing consumerId in JWT token')
  }

  if (!process.env.APIDECK_API_KEY) {
    throw new Error('APIDECK_API_KEY environment variable is not set')
  }

  if (!process.env.APIDECK_APP_ID) {
    throw new Error('APIDECK_APP_ID environment variable is not set')
  }

  return new Apideck({
    apiKey: process.env.APIDECK_API_KEY,
    appId: applicationId,
    consumerId
  })
}


