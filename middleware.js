import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

// Define protected routes
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])

export default clerkMiddleware((auth, req) => {
  // If the request is not a public route and it's a protected route, protect it
  if (!isPublicRoute(req) && isProtectedRoute(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
