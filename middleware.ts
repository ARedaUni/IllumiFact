import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import next from 'next';
export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return await updateSession(request)
}
function isCrawler(userAgent: string) {
  // Implement logic to identify crawlers (e.g., using a library)
  return /Googlebot|Bingbot/i.test(userAgent); // Basic example
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
   '/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // '/submitclaim',
    // '/signup/adduserdetails',
    // '/protected/admin',
    // '/protected/settings',
    // '/protected/viewmisinformation'
  ],
}

