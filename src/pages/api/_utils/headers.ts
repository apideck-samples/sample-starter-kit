export const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.APIDECK_API_KEY}`,
  'X-APIDECK-CONSUMER-ID': `${process.env.NEXT_PUBLIC_CONSUMER_ID}`,
  'X-APIDECK-APP-ID': `${process.env.APIDECK_APP_ID}`
}
