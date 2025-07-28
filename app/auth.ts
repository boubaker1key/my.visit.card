
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from 'app/db';
import { authConfig } from 'app/auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        let user = await getUser(email);
        if (user.length === 0) return null;
        let passwordsMatch = await compare(password, user[0].password!);
        if (passwordsMatch) return user[0] as any;
      },
    }),
  ],
});

/*********************************************************/

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from 'app/db';
import { authConfig } from 'app/auth.config';

interface User {
  id: string;
  email: string;
  password: string;
  // أي حقول إضافية
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          // 1. جلب المستخدم من قاعدة البيانات
          const user = await getUser(email);
          
          // 2. التحقق من وجود المستخدم
          if (!user || user.length === 0) {
            console.log('User not found');
            return null;
          }

          // 3. التحقق من كلمة السر
          const passwordsMatch = await compare(password, user[0].password!);
          if (!passwordsMatch) {
            console.log('Password does not match');
            return null;
          }

          // 4. إرجاع بيانات المستخدم بدون كلمة السر
          return {
            id: user[0].id,
            email: user[0].email,
            // أي بيانات أخرى تحتاجها في الجلسة
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
