import { NextRequest, NextResponse } from 'next/server'

import { api } from '@/lib/api'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const registerResponse = await api.post('/register', { code })
  const { token } = await registerResponse.data

  const redirectURL = new URL('/', request.url)

  // seconds * minutes (one hour) * day * totalDays
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
