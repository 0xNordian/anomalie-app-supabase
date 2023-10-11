// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { NextResponse } from 'next/server'

// import type { NextRequest } from 'next/server'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()

//   // Create a Supabase client configured to use cookies
//   const supabase = createMiddlewareClient({ req, res })

//   // Refresh session if expired - required for Server Components
//   // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
//   await supabase.auth.getSession()

//   return res
// }

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from './types/database'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  return res
}