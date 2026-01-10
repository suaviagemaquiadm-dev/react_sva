import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps } from 'firebase-admin/app';

// Inicializa Firebase Admin (só no server)
if (!getApps().length) {
  initializeApp({
    credential: {
      // Use variável de ambiente segura
      getAccessToken: async () => ({
        access_token: process.env.FIREBASE_ADMIN_TOKEN || '',
        expires_in: 3600,
        token_type: 'Bearer',
      }),
    },
  });
}

export async function middleware(request: NextRequest) {
  const publicPaths = ['/', '/login', '/register'];
  const path = request.nextUrl.pathname;

  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get('__session')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await getAuth().verifySessionCookie(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/partner/:path*'],
};
