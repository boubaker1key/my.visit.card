import { NextAuthConfig } from 'next-auth';




export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login?error=true'
  },
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      
      if (pathname.startsWith('/protected')) {
        return !!auth?.user; 
      }

      if (auth?.user && pathname.startsWith('/login')) {
        return Response.redirect(new URL('/protected', request.nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;




/*
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      let isOnDashboard = nextUrl.pathname.startsWith('/protected');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // is Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/protected', nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

