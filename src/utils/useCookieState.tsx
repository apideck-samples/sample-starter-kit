'use client'

import cookie from 'cookie'
import { useState } from 'react'

export const getCookieValue = ({
  key,
  cookies,
  options,
  defaultValue
}: {
  key: string
  cookies: any
  options: any
  defaultValue: string
}) => {
  const value = cookie.parse(cookies || '', options)

  return value[key] ?? defaultValue
}

export const useCookieState = (key: string, initialValue: any, options: any) => {
  const getInitialValue = () => {
    // if we on the server just use an initial value
    if (typeof window === 'undefined') return initialValue

    // otherwise get initial cookie value from `document.cookies`
    const cookieValue = getCookieValue({
      key,
      cookies: document.cookie,
      options: options?.decodeOps,
      defaultValue: initialValue
    })

    // Return null if the cookie value is 'null' string
    return cookieValue === 'null' ? null : cookieValue
  }

  // get initial state value on component mounts
  const [value, setValue] = useState(getInitialValue)

  // encode and save the new cookie value
  const setNextValue = (value: any) => {
    if (value === null || value === undefined) {
      // Remove cookie by setting it to expire
      document.cookie = cookie.serialize(key, '', { ...options?.encodeOps, maxAge: -1 })
    } else {
      document.cookie = cookie.serialize(key, value, options?.encodeOps)
    }
    setValue(value)
  }

  return [value, setNextValue]
}
