import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Await the auth() function to resolve the ClerkMiddlewareAuthObject
  const authObject = await auth();

  // Redirect unauthenticated users to sign-in for protected routes
  if (!authObject.userId && isProtectedRoute(req)) {
    return authObject.redirectToSignIn();
  }

  // Redirect authenticated users without an organization to onboarding
  if (
    authObject.userId &&
    !authObject.orgId &&
    req.nextUrl.pathname !== "/dashboard" &&
    req.nextUrl.pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

// Middleware configuration
export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API and tRPC routes
    "/(api|trpc)(.*)",
  ],
};